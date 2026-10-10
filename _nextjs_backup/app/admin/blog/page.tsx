export default function AdminBlog() {
  return (
    <section className="dash-main">
      <small className="eyebrow">ADMIN</small>
      <h1>Blog & Content</h1>
      <div className="table-card" style={{ marginTop: 24 }}>
        <h2>Recent Posts</h2>
        <div className="notice">No blog posts have been published yet.</div>
      </div>
    </section>
  );
}