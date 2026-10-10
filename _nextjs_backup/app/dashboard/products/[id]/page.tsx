import PageShell from "@/components/PageShell";
import { getDb } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import type { Product } from "@/lib/db-types";
import { Field } from "@/components/Forms";

export default async function EditProduct({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!user) return redirect("/login");

  const db = getDb();
  const product = await db.prepare("SELECT * FROM products WHERE id = ? AND seller_id = ?").bind(id, user.id).first<Product>();
  
  if (!product) return notFound();

  // Get external image if drafted
  const images = (await db.prepare("SELECT * FROM product_images WHERE product_id = ?").bind(id).all()).results || [];
  const primaryImage = images[0]?.r2_key as string | undefined;

  return (
    <PageShell>
      <section className="dashboard">
        <div className="container dashboard-grid">
          <aside className="side">
            <b>Seller Dashboard</b>
            <a href="/dashboard">Overview</a>
            <a href="/dashboard/products">Products</a>
            <a href="/dashboard/products/new">Add product</a>
            <a href="/dashboard/analytics">Analytics</a>
            <a href="/dashboard/reviews">Reviews</a>
            <a href="/dashboard/blog">Blog</a>
            <a href="/dashboard/profile">Profile / Storefront</a>
          </aside>
          <section className="dash-main">
            <small className="eyebrow">EDIT PRODUCT</small>
            <h1>{product.title}</h1>
            <p>Review the imported data and finalize your listing.</p>
            
            <div className="form-card" style={{ marginTop: 25 }}>
              <h3>Primary Image</h3>
              {primaryImage ? (
                <img src={primaryImage} alt="Cover" style={{ width: "100%", maxWidth: 300, borderRadius: 8, marginTop: 10 }} />
              ) : (
                <p style={{ color: "#666" }}>No image imported.</p>
              )}
              
              <form action="/api/upload-image" method="POST" encType="multipart/form-data" style={{ marginTop: 15 }}>
                <input type="hidden" name="productId" value={id} />
                <input type="file" name="file" accept="image/*" />
                <button type="submit" className="button" style={{ padding: "6px 12px", fontSize: 12, marginTop: 10 }}>Upload to R2</button>
              </form>

              <hr style={{ margin: "30px 0", border: 0, borderTop: "1px solid var(--bd)" }} />

              <form action="/api/products/update" method="POST">
                <input type="hidden" name="id" value={id} />
                <Field name="title" label="Title" defaultValue={product.title} />
                <label className="field">
                  <span>Description</span>
                  <textarea name="description" rows={5} defaultValue={product.description || ""}></textarea>
                </label>
                <Field name="source_url" label="Product URL" defaultValue={product.source_url || ""} />
                
                <label className="field" style={{ marginTop: 15 }}>
                  <span>Status</span>
                  <select name="status" defaultValue={product.status}>
                    <option value="draft">Draft</option>
                    <option value="active">Active (Publish)</option>
                  </select>
                </label>

                <button type="submit" className="button" style={{ marginTop: 20 }}>Save Product Details</button>
              </form>
            </div>
          </section>
        </div>
      </section>
    </PageShell>
  );
}
