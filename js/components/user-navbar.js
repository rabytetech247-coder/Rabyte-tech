class UserNavbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="user-navbar" style="background: #ffffff; padding: 15px 30px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; margin-left: 250px;">
        <div class="navbar-left">
          <h2 style="margin: 0; font-size: 18px; color: #0f172a;" id="page-title">Dashboard</h2>
        </div>
        <div class="navbar-right" style="display: flex; gap: 20px; align-items: center;">
          <a href="/" style="color: #64748b; text-decoration: none; font-size: 14px;">Marketplace</a>
          <div class="user-profile" style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 32px; height: 32px; background: #3b82f6; border-radius: 50%; color: white; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold;">U</div>
            <span style="font-weight: 500; font-size: 14px; color: #0f172a;">Creator</span>
          </div>
        </div>
      </header>
    `;
  }
}
customElements.define('user-navbar', UserNavbar);
