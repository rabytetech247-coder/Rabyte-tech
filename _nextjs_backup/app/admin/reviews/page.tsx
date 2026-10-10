import { getDb } from "@/lib/db";

export default async function AdminReviews() {
  const db = getDb();
  
  const reviews = await db.prepare(`
    SELECT r.id, r.rating, r.review_text, r.status, r.created_at, u.username, p.title as product_title
    FROM ratings r
    LEFT JOIN users u ON r.user_id = u.id
    LEFT JOIN products p ON r.product_id = p.id
    ORDER BY r.created_at DESC
  `).all<any>();

  return (
    <section className="dash-main">
      <small className="eyebrow">ADMIN</small>
      <h1>Reviews Moderation</h1>
      
      <div className="table-card" style={{ marginTop: 24 }}>
        <h2>All Platform Reviews ({reviews.results?.length || 0})</h2>
        
        {reviews.results?.length === 0 ? (
          <div className="notice">No reviews submitted yet.</div>
        ) : (
          reviews.results?.map((rev: any) => (
            <div className="fake-row" key={rev.id} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <b>{rev.rating} / 5 Stars</b> on <i>{rev.product_title}</i>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>by @{rev.username}</div>
                </div>
                <div style={{ alignSelf: 'flex-start' }}>
                  <span style={{ padding: '2px 6px', background: rev.status === 'approved' ? '#efe' : '#eee', borderRadius: 4, fontSize: '0.8rem', marginRight: 10 }}>
                    {rev.status}
                  </span>
                  <button className="mini-button" style={{ background: '#fee' }}>Remove</button>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#444' }}>"{rev.review_text}"</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}