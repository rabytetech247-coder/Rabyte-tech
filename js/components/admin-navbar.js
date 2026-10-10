class AdminNavbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="admin-navbar" style="background: #ffffff; padding: 15px 30px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; margin-left: 250px;">
        <div class="navbar-left">
          <input type="text" placeholder="Search admin..." style="padding: 8px 15px; border: 1px solid #cbd5e1; border-radius: 6px; width: 300px;" />
        </div>
        <div class="navbar-right" style="display: flex; gap: 20px; align-items: center;">
          <a href="/" style="color: #64748b; text-decoration: none; font-size: 14px;">View Live Site</a>
          <div class="admin-profile" style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 32px; height: 32px; background: #e2e8f0; border-radius: 50%;"></div>
            <span style="font-weight: 500; font-size: 14px; color: #0f172a;">Admin</span>
          </div>
        </div>
      </header>
    `;
  }
}
customElements.define('admin-navbar', AdminNavbar);
