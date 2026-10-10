class AdminSidebar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <aside class="sidebar admin-sidebar" style="width: 250px; background: #1a1a1a; color: white; height: 100vh; padding: 20px; position: fixed;">
        <div class="sidebar-header" style="margin-bottom: 30px;">
          <h3 style="margin: 0; color: #facc15;">Admin Panel</h3>
        </div>
        <nav class="sidebar-nav" style="display: flex; flex-direction: column; gap: 15px;">
          <a href="/admin/index.html" style="color: #cbd5e1; text-decoration: none;">Dashboard</a>
          <a href="/admin/products.html" style="color: #cbd5e1; text-decoration: none;">Moderate Products</a>
          <a href="/admin/users.html" style="color: #cbd5e1; text-decoration: none;">Manage Users</a>
          <a href="/admin/settings.html" style="color: #cbd5e1; text-decoration: none;">Settings</a>
        </nav>
      </aside>
    `;
  }
}
customElements.define('admin-sidebar', AdminSidebar);
