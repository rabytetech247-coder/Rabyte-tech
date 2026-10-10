class ComponentHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="nav-premium-wrap">
        <nav class="nav-premium container">
          <a href="/" class="brand" style="display: flex; align-items: center;">
            <img src="/logo.png" alt="Rabyte-Tech" style="height: 40px; width: auto;" />
          </a>
          <div class="nav-links-premium">
            <a href="/products.html">Products</a>
            <a href="/categories.html">Categories</a>
            <a href="/featured.html">Featured</a>
            <div class="nav-dropdown">
              <a href="/blog.html">Resources 
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </a>
            </div>
          </div>
          
          <form class="nav-search-premium" action="/search.html">
            <input type="text" name="q" placeholder="Search digital products..." />
            <button type="submit">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>
            </button>
          </form>

          <div class="nav-actions-premium" id="auth-buttons">
            <!-- Will be populated dynamically based on auth state -->
            <a href="/login.html" class="btn-login-premium">Login</a>
            <a href="/submit.html" class="btn-submit-premium">Submit Product</a>
          </div>
          
          <button class="mobile-menu-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></svg>
          </button>
        </nav>
      </header>
    `;

    // Simple script to handle mobile menu
    const mobileBtn = this.querySelector('.mobile-menu-btn');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            const links = this.querySelector('.nav-links-premium');
            const actions = this.querySelector('.nav-actions-premium');
            const search = this.querySelector('.nav-search-premium');
            
            links.classList.toggle('show-mobile');
            actions.classList.toggle('show-mobile');
            search.classList.toggle('show-mobile');
        });
    }

    // Call a global function to update auth state if it exists
    if (window.updateAuthState) {
      window.updateAuthState(this.querySelector('#auth-buttons'));
    }
  }
}

customElements.define('template-header', ComponentHeader);
