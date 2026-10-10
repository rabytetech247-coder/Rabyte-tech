import PageShell from "@/components/PageShell";

export default function Page() {
  return (
    <PageShell>
      <section className="page-head">
        <div className="container">
          <small className="eyebrow">RABYTE-TECH</small>
          <h1>Privacy Policy</h1>
          <p>How account, analytics, listing and security information is handled.</p>
        </div>
      </section>
      <section className="section container">
        <div className="content-card">
          <h2>Information We Collect</h2>
          <p>When you visit Rabyte-Tech, we may collect basic usage data and analytics to help improve our platform. If you register for an account, we collect your email address, username, and profile information.</p>
          
          <h2>How We Use Your Information</h2>
          <p>We use your data to provide a better browsing experience, manage your account, and display personalized product recommendations. For sellers, your public profile and listing information will be visible to all users.</p>
          
          <h2>Third-Party Checkout</h2>
          <p>Because Rabyte-Tech acts as a discovery directory, transactions occur on third-party websites. We do not collect or store your payment information, credit card numbers, or billing addresses. Please refer to the privacy policies of individual sellers for information on their data handling practices.</p>
          
          <h2>Data Security</h2>
          <p>We employ industry-standard security measures to protect your account information. Passwords are securely hashed, and our infrastructure is built with best-in-class security practices.</p>
          
          <h2>Your Rights</h2>
          <p>You have the right to request access to, modification, or deletion of your personal data at any time. Please contact us to exercise these rights.</p>
        </div>
      </section>
    </PageShell>
  );
}