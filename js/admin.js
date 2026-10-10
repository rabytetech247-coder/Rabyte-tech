document.addEventListener("DOMContentLoaded", async () => {
  // Check auth first
  try {
    const res = await fetch("/api/auth/me");
    const data = await res.json();
    if (!data.user || data.user.role !== 'admin') {
      // Redirect unauthorized
      window.location.href = "/auth/login.html";
      return;
    }
    
    // Load products
    loadPendingProducts();
  } catch (e) {
    window.location.href = "/auth/login.html";
  }
});

async function loadPendingProducts() {
  const tbody = document.getElementById("admin-table-body");
  const countEl = document.getElementById("pending-count");
  
  try {
    const res = await fetch("/api/admin/products");
    const data = await res.json();
    
    if (data.products && data.products.length > 0) {
      countEl.textContent = data.products.length;
      tbody.innerHTML = data.products.map(p => `
        <tr id="row-${p.id}">
          <td><strong>${p.title}</strong></td>
          <td>${p.category_id || 'Unknown'}</td>
          <td>${p.seller_id}</td>
          <td>
            <button class="btn btn-approve" onclick="moderateProduct('${p.id}', 'approve')">Approve</button>
            <button class="btn btn-reject" onclick="moderateProduct('${p.id}', 'reject')">Reject</button>
          </td>
        </tr>
      `).join("");
    } else {
      countEl.textContent = "0";
      tbody.innerHTML = `<tr><td colspan="4">No pending products to moderate.</td></tr>`;
    }
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="4" style="color:red;">Error loading products.</td></tr>`;
  }
}

window.moderateProduct = async function(productId, action) {
  const row = document.getElementById(`row-${productId}`);
  if (row) row.style.opacity = "0.5";
  
  try {
    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, action })
    });
    
    if (res.ok) {
      if (row) row.remove();
      // Update count
      const countEl = document.getElementById("pending-count");
      countEl.textContent = Math.max(0, parseInt(countEl.textContent || "0") - 1);
    } else {
      alert("Failed to moderate product");
      if (row) row.style.opacity = "1";
    }
  } catch (err) {
    alert("Network error");
    if (row) row.style.opacity = "1";
  }
};
