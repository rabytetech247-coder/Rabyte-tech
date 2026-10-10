export default function DashboardBlog() {
  return (
    <section className="dash-main">
      <small className="eyebrow">DASHBOARD</small>
      <h1>My Blog Posts</h1>
      <div className="table-card" style={{ marginTop: 24 }}>
        <h2>Published Content</h2>
        <div className="notice">You haven't published any blog posts yet.</div>
      </div>
    </section>
  );
}