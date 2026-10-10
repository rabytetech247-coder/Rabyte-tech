import PageShell from "@/components/PageShell";

export default function Page() {
  return (
    <PageShell>
      <section className="page-head">
        <div className="container">
          <small className="eyebrow">RABYTE-TECH</small>
          <h1>About Rabyte-Tech</h1>
          <p>A discovery-first platform for digital products, independent creators and useful resources.</p>
        </div>
      </section>
      <section className="section container">
        <div className="content-card">
          <h2>Our Vision</h2>
          <p>At Rabyte-Tech, we are building the definitive discovery directory for top-tier digital products, SaaS tools, AI models, and developer resources. Founded by Devi, a full-stack architect with 20+ years of experience in creating scalable AI systems and autonomous workflows, our mission is to connect creators with users looking for premium digital assets.</p>
          <h2>What We Offer</h2>
          <p>We hand-pick and curate a vast selection of:</p>
          <ul>
            <li><strong>AI Models & Tools:</strong> Cutting-edge machine learning resources, prompts, and autonomous agents.</li>
            <li><strong>SaaS Platforms:</strong> Ready-to-use software solutions to scale your business.</li>
            <li><strong>Developer Resources:</strong> Templates, boilerplate code, APIs, and smart contracts.</li>
            <li><strong>Design Assets:</strong> High-conversion UI/UX kits, graphics, and templates.</li>
          </ul>
          <h2>Platform Principles</h2>
          <p>Rabyte-Tech is designed as a discovery directory. We aim to highlight the best tools without standing in the way of creators. In our MVP phase, we do not process external seller transactions—you are directed straight to the creators to complete your purchase securely.</p>
        </div>
      </section>
    </PageShell>
  );
}