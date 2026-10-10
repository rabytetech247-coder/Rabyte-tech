class AdminFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="admin-footer" style="padding: 20px 30px; text-align: right; color: #94a3b8; font-size: 13px; margin-left: 250px;">
        Rabyte-Tech Admin Panel &copy; ${new Date().getFullYear()}
      </footer>
    `;
  }
}
customElements.define('admin-footer', AdminFooter);
