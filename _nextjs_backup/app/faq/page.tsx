import PageShell from "@/components/PageShell";

export default function Page() {
  return (
    <PageShell>
      <section className="page-head">
        <div className="container">
          <small className="eyebrow">RABYTE-TECH</small>
          <h1>Frequently asked questions</h1>
          <p>Find answers about listings, external checkout, seller profiles, reviews and analytics.</p>
        </div>
      </section>
      <section className="section container">
        <div className="content-card">
          <h2>General Questions</h2>
          <h3>What is Rabyte-Tech?</h3>
          <p>Rabyte-Tech is a curated discovery platform for digital products ranging from SaaS templates to AI systems and design assets. We help creators showcase their work to a broader audience.</p>
          
          <h3>Do I purchase products directly on Rabyte-Tech?</h3>
          <p>Currently, Rabyte-Tech acts as a discovery directory. When you find a product you like, we redirect you to the creator's external checkout page to complete the transaction.</p>
          
          <h2>For Creators & Sellers</h2>
          <h3>How can I list my product?</h3>
          <p>You can apply to list your product by creating a seller account. Once approved, you can showcase your software, AI models, or digital assets.</p>
          
          <h3>What kind of products are allowed?</h3>
          <p>We accept high-quality digital products including code templates, SaaS scripts, AI tools, UI/UX kits, and educational resources. All submissions undergo a brief quality review.</p>
          
          <h2>Support</h2>
          <h3>Who do I contact if I have an issue with a purchase?</h3>
          <p>Since transactions are handled externally by the creators, you should reach out to the creator directly using the support links provided on their product page.</p>
        </div>
      </section>
    </PageShell>
  );
}