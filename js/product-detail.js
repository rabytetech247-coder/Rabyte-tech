document.addEventListener("DOMContentLoaded", async () => {
  // Extract ID from the URL (e.g., /products/p_1 -> p_1)
  const pathParts = window.location.pathname.split('/');
  const productId = pathParts[pathParts.length - 1];

  if (!productId || productId === 'products') {
    // If no ID, redirect to products listing
    window.location.href = "/products";
    return;
  }

  try {
    const res = await fetch(`/api/products/${productId}`);
    const data = await res.json();

    if (res.ok && data.product) {
      const p = data.product;
      
      // Populate DOM
      document.title = `${p.title} | Rabyte-Tech`;
      document.getElementById("detail-img").src = p.image;
      document.getElementById("detail-platform").textContent = p.source;
      document.getElementById("detail-title").textContent = p.title;
      document.getElementById("detail-rating").textContent = p.rating;
      document.getElementById("detail-reviews").textContent = `(${p.reviews} reviews)`;
      document.getElementById("detail-desc").textContent = p.description;
      document.getElementById("detail-price").textContent = p.price;
      
      const buyBtn = document.getElementById("detail-buy-btn");
      buyBtn.href = p.source_url;
      document.getElementById("detail-btn-platform").textContent = p.source;

      // Seller info
      document.getElementById("seller-name").textContent = p.seller.name;
      document.getElementById("seller-trust").textContent = p.seller.trust_score;
      document.getElementById("seller-avatar").textContent = p.seller.name ? p.seller.name.charAt(0).toUpperCase() : 'U';

      // Hide loading, show content
      document.getElementById("loading").style.display = "none";
      document.getElementById("product-content").style.display = "grid";
    } else {
      document.getElementById("loading").style.display = "none";
      document.getElementById("error").style.display = "block";
    }
  } catch (err) {
    document.getElementById("loading").style.display = "none";
    document.getElementById("error").style.display = "block";
  }
});
