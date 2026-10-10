class UserSidebar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <aside class="sidebar user-sidebar" style="width: 250px; background: #f8fafc; color: #1e293b; height: 100vh; padding: 20px; position: fixed; border-right: 1px solid #e2e8f0;">
        <div class="sidebar-header" style="margin-bottom: 30px;">
          <h3 style="margin: 0; color: #0f172a;">Seller Dashboard</h3>
        </div>
        <nav class="sidebar-nav" style="display: flex; flex-direction: column; gap: 15px;">
          <a href="/user/dashboard.html" style="color: #475569; text-decoration: none; font-weight: 500;">Overview</a>
          <a href="/user/products.html" style="color: #475569; text-decoration: none; font-weight: 500;">My Products</a>
          <a href="/user/submit.html" style="color: #475569; text-decoration: none; font-weight: 500;">Submit New Product</a>
          <a href="/user/analytics.html" style="color: #475569; text-decoration: none; font-weight: 500;">Analytics</a>
          <a href="/user/settings.html" style="color: #475569; text-decoration: none; font-weight: 500;">Account Settings</a>
        </nav>
      </aside>
    `;
  }
}
customElements.define('user-sidebar', UserSidebar);
