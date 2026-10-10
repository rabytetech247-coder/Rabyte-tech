import { getDb } from "@/lib/db";

export default async function AdminCategories() {
  const db = getDb();
  
  const categories = await db.prepare(`
    SELECT id, name, slug, description 
    FROM categories 
    ORDER BY name ASC
  `).all<any>();

  return (
    <section className="dash-main">
      <small className="eyebrow">ADMIN</small>
      <h1>Categories Management</h1>
      
      <div style={{ marginBottom: 16 }}>
        <button className="button">Add New Category</button>
      </div>

      <div className="table-card">
        <h2>All Categories ({categories.results?.length || 0})</h2>
        
        {categories.results?.length === 0 ? (
          <div className="notice">No categories found.</div>
        ) : (
          categories.results?.map((cat: any) => (
            <div className="fake-row" key={cat.id} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: '10px' }}>
              <div>
                <b>{cat.name}</b>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>/{cat.slug}</div>
              </div>
              <span style={{ alignSelf: 'center', color: '#555' }}>{cat.description || 'No description'}</span>
              <div style={{ alignSelf: 'center' }}>
                <button className="mini-button" style={{ marginRight: 8 }}>Edit</button>
                <button className="mini-button" style={{ background: '#fee' }}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}