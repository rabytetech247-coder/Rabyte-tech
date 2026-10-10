import PageShell from "@/components/PageShell";
import Icon from "@/components/Icon";

export default function Submit() {
  return (
    <PageShell>
      <div className="submit-page-wrap">
        <div className="submit-bg-glow"></div>
        <div className="container">
          <div className="submit-head fade-in-up">
            <small className="eyebrow" style={{ color: "var(--o)" }}>SELL ON RABYTE-TECH</small>
            <h1>List your digital product</h1>
            <p>Paste a direct product URL. The AI importer will fetch your public metadata and images automatically.</p>
          </div>
          
          <div className="submit-card fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="submit-import-box">
              <label style={{ fontSize: "13px", fontWeight: 700, color: "#fff" }}>Direct Product URL</label>
              <div className="submit-import-row">
                <input placeholder="https://gumroad.com/l/your-product" />
                <button className="btn-import">Auto-Import</button>
              </div>
              <small style={{ color: "#777", fontSize: "11px" }}>
                Supported platforms: Gumroad, Lemon Squeezy, Stripe, Payhip, or custom domains.
              </small>
            </div>
            
            <div className="submit-form-grid">
              <label className="premium-field">
                <span>Product title</span>
                <input placeholder="e.g. Next.js SaaS Boilerplate" />
              </label>
              <label className="premium-field">
                <span>Price (USD)</span>
                <input placeholder="$49" />
              </label>
              <label className="premium-field">
                <span>Category</span>
                <select className="premium-select">
                  <option>AI Systems</option>
                  <option>SaaS Templates</option>
                  <option>Web3 & Crypto</option>
                  <option>UI/UX Design</option>
                  <option>Backend APIs</option>
                </select>
              </label>
              <label className="premium-field">
                <span>Tags</span>
                <input placeholder="ai, SaaS, template, react" />
              </label>
              <label className="premium-field">
                <span>Creator/Seller Name</span>
                <input placeholder="Your brand name" />
              </label>
              <label className="premium-field">
                <span>Support Email</span>
                <input placeholder="hello@yourbrand.com" />
              </label>
            </div>
            
            <label className="premium-field" style={{ marginBottom: "24px" }}>
              <span>Description</span>
              <textarea placeholder="Write a compelling description of your product. Markdown is supported." />
            </label>
            
            <div className="premium-upload">
              <div className="premium-upload-icon">
                <Icon name="upload" size={20} />
              </div>
              <strong style={{ display: "block", color: "#fff", marginBottom: "8px" }}>Upload Cover Image</strong>
              <small>Click to browse or drag and drop. 16:9 aspect ratio recommended. Max 5MB.</small>
            </div>
            
            <button className="btn-submit-final">
              Submit Product for Review
            </button>
          </div>
        </div>
      </div>
    </PageShell>
  );
}