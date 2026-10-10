import PageShell from "@/components/PageShell";
import ProductCard from "@/components/ProductCard";
import { getDb } from "@/lib/db";
import { notFound } from "next/navigation";
import type { User, Product } from "@/lib/db-types";

export const runtime = 'edge';

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const db = getDb();
  
  const user = await db.prepare("SELECT name, username, bio FROM users WHERE username = ?").bind(username).first<any>();
  if (!user) return { title: "Seller Not Found" };

  const displayName = user.name || user.username;
  return {
    title: `${displayName}'s Storefront | Rabyte-Tech`,
    description: user.bio || `Explore digital products by ${displayName} on Rabyte-Tech.`,
    alternates: {
      canonical: `https://rabyte.tech/seller/${username}`
    },
    openGraph: {
      title: `${displayName} on Rabyte-Tech`,
      description: user.bio,
      type: "profile",
    }
  };
}

export default async function Seller({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const db = getDb();

  const user = await db.prepare("SELECT * FROM users WHERE username = ?").bind(username).first<User>();
  if (!user) return notFound();

  // Fetch all published products
  const products = (await db.prepare("SELECT * FROM products WHERE seller_id = ? AND status = 'active' ORDER BY created_at DESC").bind(user.id).all<Product>()).results || [];

  // Generate dynamic category chips
  const categoryIds = [...new Set(products.map((p: any) => p.category_id).filter(Boolean))];
  // Normally you'd join categories, but for now we'll just show the IDs or a placeholder chip if they exist.
  // Assuming products have category_id populated properly.
  
  // Calculate average rating
  const avgRating = products.length > 0 
    ? (products.reduce((acc: any, p: any) => acc + (p.source_rating || 0), 0) / products.length).toFixed(1)
    : "0.0";
    
  const totalReviews = products.reduce((acc: any, p: any) => acc + (p.source_review_count || 0), 0);

  return (
    <PageShell>
      <section className="seller-head">
        <div className="container">
          <div className="avatar">{user.username.charAt(0).toUpperCase()}</div>
          <small className="eyebrow">SELLER PROFILE</small>
          <h1>{user.name || user.username}</h1>
          <p>{user.bio || "Independent creator building useful digital products."}</p>
          
          <div className="seller-stats">
            <span><b>{products.length}</b> Products</span>
            <span><b>{avgRating}</b> Average rating</span>
            <span><b>{totalReviews}</b> Reviews</span>
          </div>
          
          {categoryIds.length > 0 && (
            <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
              {categoryIds.map((cid: any) => (
                <span key={cid} style={{ background: "#222", padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: "bold" }}>
                  Category ID: {cid}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>
      <section className="section container">
        <h2>Products</h2>
        {products.length === 0 ? (
          <p>This seller hasn't published any products yet.</p>
        ) : (
          <div className="products">
            {products.map((p: any) => (
              <ProductCard key={p.id} p={p as any} /> 
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}