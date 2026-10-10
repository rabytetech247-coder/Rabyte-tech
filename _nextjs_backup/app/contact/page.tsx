import PageShell from "@/components/PageShell";

export default function Page() {
  return (
    <PageShell>
      <section className="page-head">
        <div className="container">
          <small className="eyebrow">RABYTE-TECH</small>
          <h1>Contact Us</h1>
          <p>Questions, partnerships, product reports and support requests can be routed through the contact system.</p>
        </div>
      </section>
      <section className="section container">
        <div className="content-card">
          <h2>Get in Touch</h2>
          <p>Whether you're a creator looking to partner with us, or a user with a platform question, we'd love to hear from you.</p>
          
          <h3>General Inquiries</h3>
          <p>For general questions, feedback, and platform support, email us at: <strong>support@rabyte-tech.com</strong></p>
          
          <h3>Partnerships & Business</h3>
          <p>For business opportunities, sponsorships, and integrations, please reach out to our administration team at: <strong>admin@rabyte-tech.com</strong></p>
          
          <h3>Product Support</h3>
          <p>If you require support for a specific product you discovered on Rabyte-Tech, please contact the seller directly via their external website. We do not provide technical support for third-party items.</p>
        </div>
      </section>
    </PageShell>
  );
}