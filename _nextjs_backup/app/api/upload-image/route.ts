export const runtime = 'edge';
import { NextRequest, NextResponse } from "next/server";
import { getAssetsBucket, getDb } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get("file") as File;
  const productId = formData.get("productId") as string;

  if (!file || !productId) {
    return NextResponse.redirect(new URL(`/dashboard/products/${productId}?error=MissingData`, request.url));
  }

  const db = getDb();
  // Ensure user owns this product
  const product = await db.prepare("SELECT id FROM products WHERE id = ? AND seller_id = ?").bind(productId, user.id).first();
  if (!product) {
    return NextResponse.json({ error: "Product not found or unauthorized" }, { status: 403 });
  }

  const bucket = getAssetsBucket();
  const arrayBuffer = await file.arrayBuffer();
  
  // Create a unique key for R2
  const extension = file.name.split(".").pop() || "png";
  const key = `products/${productId}/${crypto.randomUUID()}.${extension}`;

  // Upload to R2
  await bucket.put(key, arrayBuffer, {
    httpMetadata: { contentType: file.type }
  });

  // Since we might not have a public domain mapped yet in dev, we store the relative key or worker URL
  // If we had a custom domain attached to the bucket, we'd store `https://assets.rabyte.tech/${key}`
  const publicUrl = `/api/assets/${key}`; // Serving through our own route
  
  // Insert into product_images
  const imageId = crypto.randomUUID();
  await db.prepare(`
    INSERT INTO product_images (id, product_id, r2_key, alt_text, source_type)
    VALUES (?, ?, ?, ?, 'r2')
  `).bind(imageId, productId, publicUrl, file.name).run();

  return NextResponse.redirect(new URL(`/dashboard/products/${productId}`, request.url));
}

