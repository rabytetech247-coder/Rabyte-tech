"use server";

import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function submitReviewAction(prevState: any, formData: FormData) {
  const user = await getCurrentUser();
  if (!user) {
    return { error: "You must be logged in to leave a review." };
  }

  const productId = formData.get("productId") as string;
  const ratingStr = formData.get("rating") as string;
  const reviewText = formData.get("reviewText") as string;

  if (!productId || !ratingStr) {
    return { error: "Missing product or rating." };
  }

  const rating = parseInt(ratingStr, 10);
  if (rating < 1 || rating > 5) {
    return { error: "Rating must be between 1 and 5." };
  }

  const db = getDb();
  
  // Check if user already reviewed
  const existing = await db.prepare("SELECT id FROM ratings WHERE product_id = ? AND user_id = ?").bind(productId, user.id).first();
  if (existing) {
    return { error: "You have already reviewed this product." };
  }

  const id = crypto.randomUUID();
  await db.prepare(`
    INSERT INTO ratings (id, product_id, user_id, rating, review_text, status)
    VALUES (?, ?, ?, ?, ?, 'published')
  `).bind(id, productId, user.id, rating, reviewText || null).run();

  // Redirect back to the product page to show the new review
  const product = await db.prepare("SELECT slug FROM products WHERE id = ?").bind(productId).first<{slug: string}>();
  if (product) {
    redirect(`/products/${product.slug}`);
  }
}
