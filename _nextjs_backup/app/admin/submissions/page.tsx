import { getDb } from "@/lib/db";

export default async function AdminSubmissions() {
  const db = getDb();
  
  const pendingProducts = await db.prepare(`
    SELECT p.id, p.title, p.source_platform, p.source_url, p.created_at, u.username as seller_name
    FROM products p
    LEFT JOIN users u ON p.seller_id = u.id
    WHERE p.status = 'pending'
    ORDER BY p.created_at DESC
  `).all<any>();

  return (
    <section className="dash-main">
      <small className="eyebrow">ADMIN</small>
      <h1>Submissions Queue</h1>
      
      <div className="table-card" style={{ marginTop: 24 }}>
        <h2>Pending Submissions ({pendingProducts.results?.length || 0})</h2>
        <p>Review and approve newly submitted products.</p>
        
        {pendingProducts.results?.length === 0 ? (
          <div className="notice">No pending submissions at this time.</div>
        ) : (
          pendingProducts.results?.map((prod: any) => (
            <div className="fake-row" key={prod.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: '10px' }}>
              <div>
                <b>{prod.title}</b>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>URL: {prod.source_url}</div>
              </div>
              <span style={{ alignSelf: 'center' }}>by @{prod.seller_name}</span>
              <span style={{ alignSelf: 'center', textTransform: 'capitalize' }}>{prod.source_platform}</span>
              <div style={{ alignSelf: 'center' }}>
                <button className="mini-button" style={{ marginRight: 8, background: '#efe' }}>Approve</button>
                <button className="mini-button" style={{ background: '#fee' }}>Reject</button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}