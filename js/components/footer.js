class ComponentFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="footer-premium">
        <div class="container footer-grid-premium">
          <div class="footer-brand-col">
            <a href="/" class="brand" style="display: flex; align-items: center;">
              <img src="/logo.png" alt="Rabyte-Tech" style="height: 40px; width: auto;" />
            </a>
            <p class="footer-desc">A free marketplace for digital products created by independent creators around the world.</p>
            <div class="footer-socials">
               <a href="#" class="social-icon">X</a>
               <a href="#" class="social-icon">f</a>
               <a href="#" class="social-icon">in</a>
            </div>
          </div>
          <div class="footer-link-col">
            <b>Explore</b>
            <a href="/products.html">Products</a>
            <a href="/categories.html">Categories</a>
            <a href="/featured.html">Featured Products</a>
            <a href="/top-rated.html">Top Rated</a>
            <a href="/blog.html">Resources</a>
          </div>
          <div class="footer-link-col">
            <b>For Sellers</b>
            <a href="/submit.html">Submit Product</a>
            <a href="/dashboard.html">Seller Dashboard</a>
            <a href="/guidelines.html">Listing Guidelines</a>
            <a href="/advertise.html">Featured Placement</a>
            <a href="/seller-policy.html">Seller Policy</a>
          </div>
          <div class="footer-link-col">
            <b>Company</b>
            <a href="/about.html">About Us</a>
            <a href="/contact.html">Contact Us</a>
            <a href="/faq.html">FAQ</a>
            <a href="/privacy.html">Privacy Policy</a>
            <a href="/terms.html">Terms & Conditions</a>
            <a href="/dmca.html">DMCA</a>
          </div>
          <div class="footer-subscribe-col">
            <b>Subscribe to Updates</b>
            <p>Get the latest products, tips and resources directly to your inbox.</p>
            <form class="subscribe-form" onsubmit="event.preventDefault(); alert('Subscribed!');">
               <input type="email" placeholder="Enter your email" required />
               <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
        <div class="container footer-bottom-premium">
          <p>© 2024 Rabyte-Tech. All rights reserved.</p>
          <div class="footer-bottom-links">
             <a href="/terms.html">Terms</a>
             <a href="/privacy.html">Privacy</a>
             <a href="/dmca.html">DMCA</a>
             <a href="/seller-policy.html">Seller Policy</a>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('template-footer', ComponentFooter);
