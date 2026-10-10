import { getDb } from "@/lib/db";

export default async function AdminPanel() {
  const db = getDb();
  
  // Fetch high-level stats
  const productsCount = await db.prepare("SELECT COUNT(*) as count FROM products").first<{count: number}>();
  const pendingCount = await db.prepare("SELECT COUNT(*) as count FROM products WHERE status = 'pending'").first<{count: number}>();
  const usersCount = await db.prepare("SELECT COUNT(*) as count FROM users").first<{count: number}>();
  const categoriesCount = await db.prepare("SELECT COUNT(*) as count FROM categories").first<{count: number}>();

  // Fetch latest pending submissions
  const pendingProducts = await db.prepare(`
    SELECT p.id, p.title, p.source_platform, u.username as seller_name
    FROM products p
    LEFT JOIN users u ON p.seller_id = u.id
    WHERE p.status = 'pending'
    ORDER BY p.created_at DESC LIMIT 5
  `).all<any>();

  return (
    <section className="dash-main">
      <small className="eyebrow">ADMIN</small>
      <h1>Admin Overview</h1>
      <div className="stat-grid">
        <div><b>{productsCount?.count || 0}</b><span>Products</span></div>
        <div><b>{pendingCount?.count || 0}</b><span>Pending submissions</span></div>
        <div><b>{usersCount?.count || 0}</b><span>Users</span></div>
        <div><b>{categoriesCount?.count || 0}</b><span>Categories</span></div>
      </div>
      <div className="table-card" style={{ marginTop: 24 }}>
        <h2>Recent Pending Submissions</h2>
        <p>Review the latest product submissions below.</p>
        {pendingProducts.results?.length === 0 ? (
          <div className="notice">No pending submissions.</div>
        ) : (
          pendingProducts.results?.map((prod: any) => (
            <div className="fake-row" key={prod.id}>
              <b>{prod.title}</b>
              <span>by @{prod.seller_name}</span>
              <span>{prod.source_platform}</span>
              <button className="mini-button">Review</button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}