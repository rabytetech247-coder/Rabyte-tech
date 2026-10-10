import { getDb } from "@/lib/db";

export default async function AdminUsers() {
  const db = getDb();
  
  // Fetch users from DB
  const users = await db.prepare(`
    SELECT id, email, username, name, role, status, trust_score, created_at 
    FROM users 
    ORDER BY created_at DESC
  `).all<any>();

  return (
    <section className="dash-main">
      <small className="eyebrow">ADMIN</small>
      <h1>Users Management</h1>
      
      <div className="table-card" style={{ marginTop: 24 }}>
        <h2>All Users ({users.results?.length || 0})</h2>
        <p>Manage all registered users, roles, and trust scores.</p>
        
        {users.results?.length === 0 ? (
          <div className="notice">No users found.</div>
        ) : (
          users.results?.map((user: any) => (
            <div className="fake-row" key={user.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr auto', gap: '10px' }}>
              <div>
                <b>{user.name || user.username}</b>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>@{user.username}</div>
              </div>
              <span style={{ alignSelf: 'center' }}>{user.email}</span>
              <span style={{ alignSelf: 'center', textTransform: 'uppercase', fontSize: '0.8rem' }}>{user.role}</span>
              <span style={{ alignSelf: 'center' }}>Trust: {user.trust_score}</span>
              <div style={{ alignSelf: 'center' }}>
                <button className="mini-button" style={{ marginRight: 8 }}>Edit</button>
                <button className="mini-button" style={{ background: '#fee' }}>Ban</button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}