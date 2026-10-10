import PageShell from "@/components/PageShell";

export default function Page() {
  return (
    <PageShell>
      <section className="page-head">
        <div className="container">
          <small className="eyebrow">RABYTE-TECH</small>
          <h1>DMCA & Copyright</h1>
          <p>Report copyright concerns with enough information for the moderation team to investigate.</p>
        </div>
      </section>
      <section className="section container">
        <div className="content-card">
          <h2>Copyright Infringement Policy</h2>
          <p>Rabyte-Tech respects the intellectual property rights of others. If you believe your copyrighted work has been listed on our platform without authorization, you may submit a DMCA takedown notice.</p>
          
          <h2>How to File a Takedown Notice</h2>
          <p>To report a copyright violation, please provide a written communication containing the following information:</p>
          <ul>
            <li>A physical or electronic signature of the copyright owner or authorized representative.</li>
            <li>Identification of the copyrighted work claimed to have been infringed.</li>
            <li>The exact URL (link) of the infringing listing on Rabyte-Tech.</li>
            <li>Your contact information, including name, address, telephone number, and email address.</li>
            <li>A statement that you have a good faith belief that the use is unauthorized.</li>
            <li>A statement, under penalty of perjury, that the information in the notification is accurate.</li>
          </ul>
          
          <h2>Counter-Notices</h2>
          <p>If you are a seller and believe your listing was removed in error, you may file a counter-notice. Our moderation team will review all disputes fairly.</p>
        </div>
      </section>
    </PageShell>
  );
}