import { getDb } from "@/lib/db";

export default async function AdminProducts() {
  const db = getDb();
  
  const products = await db.prepare(`
    SELECT p.id, p.title, p.status, p.source_platform, c.name as category_name, u.username as seller_name
    FROM products p
    LEFT JOIN users u ON p.seller_id = u.id
    LEFT JOIN categories c ON p.category_id = c.id
    ORDER BY p.created_at DESC
  `).all<any>();

  return (
    <section className="dash-main">
      <small className="eyebrow">ADMIN</small>
      <h1>Products Management</h1>
      
      <div className="table-card" style={{ marginTop: 24 }}>
        <h2>All Products ({products.results?.length || 0})</h2>
        <p>Manage all products currently in the database.</p>
        
        {products.results?.length === 0 ? (
          <div className="notice">No products found.</div>
        ) : (
          products.results?.map((prod: any) => (
            <div className="fake-row" key={prod.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', gap: '10px' }}>
              <div>
                <b>{prod.title}</b>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>{prod.category_name || 'Uncategorized'}</div>
              </div>
              <span style={{ alignSelf: 'center' }}>@{prod.seller_name}</span>
              <span style={{ alignSelf: 'center', textTransform: 'capitalize' }}>{prod.source_platform}</span>
              <span style={{ alignSelf: 'center' }}>
                <span style={{ padding: '2px 6px', background: prod.status === 'published' ? '#efe' : '#eee', borderRadius: 4, fontSize: '0.8rem' }}>
                  {prod.status}
                </span>
              </span>
              <div style={{ alignSelf: 'center' }}>
                <button className="mini-button" style={{ marginRight: 8 }}>Edit</button>
                <button className="mini-button" style={{ background: '#fee' }}>Remove</button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}