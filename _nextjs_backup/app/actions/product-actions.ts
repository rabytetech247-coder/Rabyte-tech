"use server";

import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { importProductUrl } from "@/lib/adapters/importer";

export async function importProductAction(prevState: any, formData: FormData) {
  const user = await getCurrentUser();
  if (!user) {
    return { error: "You must be logged in to import a product." };
  }

  const url = formData.get("url") as string;
  if (!url) {
    return { error: "Missing URL." };
  }

  let data;
  try {
    data = await importProductUrl(url);
  } catch(e: any) {
    return { error: e.message || "Failed to fetch or parse product data." };
  }

  const db = getDb();
  const id = crypto.randomUUID();
  const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + crypto.randomUUID().slice(0, 5);

  // Normalize data and insert draft
  await db.prepare(`
    INSERT INTO products (
      id, seller_id, title, slug, description, source_platform, 
      source_url, canonical_url, import_status, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'draft', 'pending')
  `).bind(
    id, user.id, data.title.slice(0, 100), slug, data.description || "", 
    data.platform, url, url
  ).run();

  // If we fetched an image, we could insert a record into product_images
  if (data.imageUrl) {
    const imageId = crypto.randomUUID();
    // In a full implementation, you might download this image and upload to R2
    // For now we'll just store the external URL directly in r2_key or a new field, 
    // or simulate it. We'll store it in r2_key for the draft view.
    await db.prepare(`
      INSERT INTO product_images (id, product_id, r2_key, alt_text, source_type)
      VALUES (?, ?, ?, ?, 'external')
    `).bind(imageId, id, data.imageUrl, data.title).run();
  }

  redirect(`/dashboard/products/${id}`);
}
