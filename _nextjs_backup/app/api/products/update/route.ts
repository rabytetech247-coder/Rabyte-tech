export const runtime = 'edge';
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await request.formData();
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const source_url = formData.get("source_url") as string;
  const status = formData.get("status") as string;

  if (!id || !title || !source_url) {
    return NextResponse.redirect(new URL(`/dashboard/products/${id}?error=MissingFields`, request.url));
  }

  const db = getDb();
  
  // Ensure user owns this product
  const product = await db.prepare("SELECT id FROM products WHERE id = ? AND seller_id = ?").bind(id, user.id).first();
  if (!product) {
    return NextResponse.json({ error: "Product not found or unauthorized" }, { status: 403 });
  }

  await db.prepare(`
    UPDATE products 
    SET title = ?, description = ?, source_url = ?, status = ?
    WHERE id = ?
  `).bind(title, description, source_url, status, id).run();

  return NextResponse.redirect(new URL(`/dashboard/products`, request.url));
}

