import PageShell from "@/components/PageShell";
import Icon from "@/components/Icon";

export default function Page() {
  return (
    <PageShell>
      <div className="policy-page">
        <section className="policy-header fade-in-up">
          <div className="container">
            <small className="eyebrow" style={{ color: "var(--o)", letterSpacing: "0.2em" }}>CREATOR GUIDELINES</small>
            <h1>Seller Policy</h1>
            <p>Everything you need to know about listing quality, ownership, prohibited content, and external product URLs.</p>
          </div>
        </section>

        <section className="container">
          <div className="policy-grid">
            
            <div className="policy-card full-width fade-in-up" style={{ animationDelay: "0.1s" }}>
              <div className="policy-icon">
                <Icon name="crown" size={24} />
              </div>
              <h2>1. Our Role as a Discovery Directory</h2>
              <p>Rabyte-Tech connects buyers with top-tier AI systems, SaaS templates, and digital assets. Because we act strictly as a discovery directory and not a merchant of record, you maintain <strong>100% of your sales revenue</strong> (excluding whatever fees your checkout provider charges). All transactions occur via your provided external checkout links (e.g., Gumroad, Lemon Squeezy, Stripe, or your own custom infrastructure).</p>
            </div>

            <div className="policy-card fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="policy-icon">
                <Icon name="check" size={24} />
              </div>
              <h2>2. Product Listing Requirements</h2>
              <p>To ensure a high-quality ecosystem for our users, all listings must adhere to strict guidelines before they are approved by our curation team:</p>
              <ul>
                <li><strong>Accurate Representation:</strong> Your product title, descriptions, and screenshots must honestly and precisely represent the product being sold. Over-promising capabilities is grounds for removal.</li>
                <li><strong>Valid Checkout Links:</strong> You must provide a valid HTTPS URL that routes directly to your product's checkout or landing page.</li>
                <li><strong>Quality Standards:</strong> We focus on production-grade software and templates. Substandard, broken, or heavily bugged code submissions will be automatically rejected.</li>
                <li><strong>Clear Documentation:</strong> Technical assets must include sufficient documentation or a quick-start guide for buyers.</li>
              </ul>
            </div>

            <div className="policy-card fade-in-up" style={{ animationDelay: "0.3s" }}>
              <div className="policy-icon" style={{ color: "#ff4d4f" }}>
                <Icon name="lock" size={24} />
              </div>
              <h2>3. Strictly Prohibited Content</h2>
              <p>We maintain a zero-tolerance policy for certain types of content. Submitting prohibited items will result in a permanent ban from the Rabyte-Tech platform:</p>
              <ul>
                <li>Malicious software, viruses, spyware, or unauthorized data collection tools.</li>
                <li>Stolen source code, cracked software, or intellectual property you do not have explicit rights to distribute.</li>
                <li>Deceptive products, low-effort re-skins, spam, or "get rich quick" schemes.</li>
                <li>Content that violates the Terms of Service of major AI providers (e.g., OpenAI, Anthropic) if your tool interfaces with their APIs.</li>
              </ul>
            </div>

            <div className="policy-card fade-in-up" style={{ animationDelay: "0.4s" }}>
              <div className="policy-icon">
                <Icon name="tag" size={24} />
              </div>
              <h2>4. Intellectual Property & Licensing</h2>
              <p>You retain full and complete ownership of your intellectual property at all times.</p>
              <ul>
                <li><strong>Grant of License to Us:</strong> By listing on Rabyte-Tech, you grant us a worldwide, royalty-free license to display your product imagery, descriptions, and metadata on our directory, in promotional materials, and on our social channels to drive traffic to your links.</li>
                <li><strong>Buyer Licensing:</strong> You are responsible for clearly defining the license under which your digital product is sold (e.g., MIT, Commercial, Single-Use). We recommend displaying this prominently on your external checkout page.</li>
              </ul>
            </div>

            <div className="policy-card fade-in-up" style={{ animationDelay: "0.5s" }}>
              <div className="policy-icon">
                <Icon name="user" size={24} />
              </div>
              <h2>5. Customer Support & Refunds</h2>
              <p>Because Rabyte-Tech does not process payments, we do not handle customer support or refunds for your products.</p>
              <ul>
                <li><strong>Seller Responsibility:</strong> You are entirely responsible for providing technical support, answering buyer inquiries, and issuing refunds according to your own established policies.</li>
                <li><strong>Contact Information:</strong> You must provide a valid support email address or support link on your product page so buyers can reach you.</li>
                <li><strong>Disputes:</strong> If we receive a high volume of complaints regarding your product or lack of support, we reserve the right to delist your product to protect our users.</li>
              </ul>
            </div>
            
            <div className="policy-card full-width fade-in-up" style={{ animationDelay: "0.6s" }}>
              <div className="policy-icon">
                <Icon name="star" size={24} />
              </div>
              <h2>6. Curation, Reviews, and Enforcement</h2>
              <p>Rabyte-Tech utilizes a community-driven review system alongside our internal curation team.</p>
              <ul>
                <li><strong>Review Manipulation:</strong> Sellers caught purchasing fake reviews, incentivizing positive reviews outside of our guidelines, or review-bombing competitors will be permanently banned.</li>
                <li><strong>Audits:</strong> We periodically audit active listings. If an external link becomes dead (404) or redirects to a malicious/unrelated site, the listing will be suspended immediately.</li>
                <li><strong>Policy Updates:</strong> We reserve the right to update this Seller Policy at any time. Continued use of the platform constitutes acceptance of the revised policies.</li>
              </ul>
            </div>

          </div>
        </section>
      </div>
    </PageShell>
  );
}