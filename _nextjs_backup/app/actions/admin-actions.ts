"use server";

import { redirect } from "next/navigation";
import { getDb } from "../../lib/db";
import { getCurrentUser } from "../../lib/auth";

export async function moderateProductAction(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!user || user.role !== 'admin') {
    throw new Error("Unauthorized");
  }

  const productId = formData.get("productId") as string;
  const action = formData.get("action") as string; // 'approve' | 'reject'

  if (!productId || !action) {
    throw new Error("Missing data");
  }

  const db = getDb();
  
  const product = await db.prepare("SELECT * FROM products WHERE id = ?").bind(productId).first<any>();
  if (!product) throw new Error("Product not found");

  if (action === "approve") {
    await db.prepare("UPDATE products SET status = 'active' WHERE id = ?").bind(productId).run();
    // Increment trust score for seller
    await db.prepare("UPDATE users SET trust_score = trust_score + 5 WHERE id = ?").bind(product.seller_id).run();
  } else if (action === "reject") {
    await db.prepare("UPDATE products SET status = 'rejected' WHERE id = ?").bind(productId).run();
    // Penalize trust score (optional, but requested logic around trust scores suggests it)
    await db.prepare("UPDATE users SET trust_score = trust_score - 10 WHERE id = ?").bind(product.seller_id).run();
  }

  redirect("/admin/submissions");
}
