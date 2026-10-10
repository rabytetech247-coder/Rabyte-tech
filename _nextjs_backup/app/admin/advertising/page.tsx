export default function AdminAdvertising() {
  return (
    <section className="dash-main">
      <small className="eyebrow">ADMIN</small>
      <h1>Advertising Campaigns</h1>
      <div className="table-card" style={{ marginTop: 24 }}>
        <h2>Active Campaigns</h2>
        <div className="notice">No active ad campaigns running.</div>
      </div>
    </section>
  );
}