import { getCurrentUser } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { redirect } from "next/navigation";
import type { Product } from "@/lib/db-types";

export default async function DashboardProducts() {
  const user = await getCurrentUser();
  if (!user) return redirect("/login");

  const db = getDb();
  const products = (await db.prepare(`
    SELECT p.*, COALESCE(s.page_views, 0) as page_views, COALESCE(s.outbound_clicks, 0) as clicks
    FROM products p
    LEFT JOIN product_stats s ON p.id = s.product_id
    WHERE p.seller_id = ?
    ORDER BY p.created_at DESC
  `).bind(user.id).all<any>()).results || [];

  return (
    <section className="dash-main">
      <small className="eyebrow">DASHBOARD</small>
      <h1>My Products</h1>
      
      <div className="table-card" style={{ marginTop: 24 }}>
        <h2>All Products ({products.length})</h2>
        <p>Manage your product catalogue and monitor clicks.</p>
        
        {products.length === 0 ? (
          <div className="notice">You haven't listed any products yet.</div>
        ) : (
          products.map((prod: any) => (
            <div className="fake-row" key={prod.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', gap: '10px' }}>
              <div>
                <b>{prod.title}</b>
                <div style={{ fontSize: '0.8rem', color: '#666', textTransform: 'capitalize' }}>{prod.status}</div>
              </div>
              <span style={{ alignSelf: 'center' }}>{prod.page_views} views</span>
              <span style={{ alignSelf: 'center' }}>{prod.clicks} clicks</span>
              <span style={{ alignSelf: 'center' }}>{prod.source_rating || 0} ★</span>
              <div style={{ alignSelf: 'center' }}>
                <a href={`/dashboard/products/${prod.id}/edit`} className="mini-button" style={{ marginRight: 8 }}>Edit</a>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}