export default function DashboardAnalytics() {
  return (
    <section className="dash-main">
      <small className="eyebrow">DASHBOARD</small>
      <h1>Store Analytics</h1>
      <div className="table-card" style={{ marginTop: 24 }}>
        <h2>Traffic & Clicks</h2>
        <div className="notice">Not enough data to display analytics graph.</div>
      </div>
    </section>
  );
}