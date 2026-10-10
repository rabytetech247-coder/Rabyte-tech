import { getCurrentUser } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { redirect } from "next/navigation";
import type { Product } from "@/lib/db-types";

export default async function Dashboard() {
  const user = await getCurrentUser();
  if (!user) return redirect("/login");

  const db = getDb();
  const products = (await db.prepare("SELECT * FROM products WHERE seller_id = ? ORDER BY created_at DESC").bind(user.id).all<Product>()).results || [];

  // Fetch aggregated stats
  const stats = (await db.prepare(`
    SELECT sum(s.page_views) as total_views, sum(s.outbound_clicks) as total_clicks
    FROM product_stats s
    JOIN products p ON s.product_id = p.id
    WHERE p.seller_id = ?
  `).bind(user.id).first<any>()) || { total_views: 0, total_clicks: 0 };
  
  // Calculate avg rating
  const reviews = (await db.prepare(`
    SELECT avg(r.rating) as avg_rating
    FROM ratings r
    JOIN products p ON r.product_id = p.id
    WHERE p.seller_id = ? AND r.status = 'published'
  `).bind(user.id).first<any>()) || { avg_rating: 0 };

  return (
    <section className="dash-main">
      <small className="eyebrow">DASHBOARD</small>
      <h1>Welcome, {user.name || user.username}</h1>
      <div className="stat-grid">
        <div><b>{products.length}</b><span>Published products</span></div>
        <div><b>{stats.total_views || 0}</b><span>Page views</span></div>
        <div><b>{stats.total_clicks || 0}</b><span>Outbound clicks</span></div>
        <div><b>{(reviews.avg_rating || 0).toFixed(1)}</b><span>Average rating</span></div>
      </div>
      <div className="table-card" style={{ marginTop: 24 }}>
        <h2>Your Products</h2>
        {products.length === 0 ? (
          <div className="notice">You haven't listed any products yet.</div>
        ) : (
          products.map((p: any) => (
            <div key={p.id} className="fake-row" style={{alignItems:"center"}}>
              <div>
                <b>{p.title}</b>
                <small style={{display:"block", color:"#666"}}>{p.status}</small>
              </div>
              <span>{p.source_rating || 0} ★</span>
              <a href={`/dashboard/products/${p.id}`} className="mini-button">Edit</a>
            </div>
          ))
        )}
      </div>
    </section>
  );
}