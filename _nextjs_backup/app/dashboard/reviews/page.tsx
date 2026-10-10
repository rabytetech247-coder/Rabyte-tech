export default function DashboardReviews() {
  return (
    <section className="dash-main">
      <small className="eyebrow">DASHBOARD</small>
      <h1>Product Reviews</h1>
      <div className="table-card" style={{ marginTop: 24 }}>
        <h2>Customer Feedback</h2>
        <div className="notice">No reviews found for your products yet.</div>
      </div>
    </section>
  );
}