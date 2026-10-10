export default function AdminFeatured() {
  return (
    <section className="dash-main">
      <small className="eyebrow">ADMIN</small>
      <h1>Featured Content</h1>
      <div className="table-card" style={{ marginTop: 24 }}>
        <h2>Featured Products</h2>
        <div className="notice">No featured products have been selected yet.</div>
      </div>
    </section>
  );
}