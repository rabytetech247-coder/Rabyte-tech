import PageShell from "@/components/PageShell";

export default function Page() {
  return (
    <PageShell>
      <section className="page-head">
        <div className="container">
          <small className="eyebrow">RABYTE-TECH</small>
          <h1>Terms of Service</h1>
          <p>Marketplace discovery, external checkout, user accounts, listings and platform rules.</p>
        </div>
      </section>
      <section className="section container">
        <div className="content-card">
          <h2>Acceptance of Terms</h2>
          <p>By accessing and using Rabyte-Tech, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.</p>
          
          <h2>Platform Nature</h2>
          <p>Rabyte-Tech is a discovery directory. We curate and list digital products but do not process transactions. Sellers are solely responsible for the accuracy, delivery, and support of their products.</p>
          
          <h2>User Accounts</h2>
          <p>You are responsible for maintaining the security of your account and password. We reserve the right to suspend or terminate accounts that violate our community guidelines, engage in spam, or list fraudulent products.</p>
          
          <h2>Seller Responsibilities</h2>
          <p>Sellers must ensure they have the necessary rights and licenses for any products they list. Misleading descriptions, copyright infringement, or malicious software will result in immediate removal and account termination.</p>
          
          <h2>Limitation of Liability</h2>
          <p>Rabyte-Tech is provided "as is". We are not liable for any damages arising from your use of the platform, nor for any disputes between buyers and external sellers.</p>
        </div>
      </section>
    </PageShell>
  );
}