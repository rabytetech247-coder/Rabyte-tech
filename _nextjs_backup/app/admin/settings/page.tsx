export default function AdminSettings() {
  return (
    <section className="dash-main">
      <small className="eyebrow">ADMIN</small>
      <h1>Global Settings</h1>
      <div className="table-card" style={{ marginTop: 24 }}>
        <h2>Configuration Variables</h2>
        <div className="notice">No custom settings configured yet. Using environment defaults.</div>
      </div>
    </section>
  );
}