class UserFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="user-footer" style="padding: 20px 30px; text-align: center; color: #94a3b8; font-size: 13px; margin-left: 250px; border-top: 1px solid #f1f5f9;">
        Seller Dashboard &copy; ${new Date().getFullYear()} Rabyte-Tech. All rights reserved.
      </footer>
    `;
  }
}
customElements.define('user-footer', UserFooter);
