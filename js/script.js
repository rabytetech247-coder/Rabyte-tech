// Products will be fetched dynamically
let products = [];

const categories = [
  {name:"AI Systems",count:"340+",icon:"/images/categories/ai.svg",description:"Autonomous agents, RAG workflows, and LLM fine-tuning."},
  {name:"SaaS Templates",count:"850+",icon:"/images/categories/templates.svg",description:"Next.js, React, and full-stack boilerplates with DB & Auth."},
  {name:"Web3 & Crypto",count:"120+",icon:"/images/categories/business.svg",description:"Smart contracts, dApp UI kits, and Web3 authentication."},
  {name:"UI/UX Design",count:"1,760+",icon:"/images/categories/design.svg",description:"High-conversion UI kits, dashboards, and Figma components."},
  {name:"Backend APIs",count:"450+",icon:"/images/categories/courses.svg",description:"Microservices, gRPC templates, and event-driven architectures."},
  {name:"Data Pipelines",count:"210+",icon:"/images/categories/ebook.svg",description:"ETL scripts, real-time analytics, and data automation."}
];

const slides = [
  { kicker: "WELCOME TO RABYTE-TECH", title: "Discover Premium Digital Products & Assets", desc: "The premier directory for Notion templates, e-books, design resources, and marketing funnels. Built by creators, for creators.", bg: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop", link: "/products" },
  { kicker: "FOR CREATORS", title: "Zero Fees. Direct Links.", desc: "Import your Gumroad, Lemon Squeezy, or custom checkout links. We drive traffic to your digital products, you keep 100% of the sales.", bg: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2000&auto=format&fit=crop", link: "/submit" },
  { kicker: "E-BOOKS & GUIDES", title: "Scale Your Creator Business", desc: "Find proven marketing playbooks, audience growth guides, and step-by-step strategies to monetize your audience effectively.", bg: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=2000&auto=format&fit=crop", link: "/categories/ebooks" },
  { kicker: "NOTION TEMPLATES", title: "Master Your Productivity", desc: "Explore aesthetic and highly functional Notion templates for finance tracking, project management, and daily journaling.", bg: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2000&auto=format&fit=crop", link: "/categories/templates" },
  { kicker: "DESIGN & UI ASSETS", title: "Premium Design Resources", desc: "Elevate your brand with high-quality UI kits, slide deck templates, and exclusive icon packs crafted by top designers.", bg: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop", link: "/categories/design" }
];

// Utility string to create the Star SVG icon
const starIcon = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z"/></svg>`;

// Function to generate Product Card HTML
function createProductCard(p, featured = false) {
  return `
    <article class="product-card">
      <a href="/products/${p.slug}" class="product-image-wrap">
        <img src="${p.image}" alt="${p.title}" />
        ${featured ? `<span class="badge" style="display:flex;align-items:center;gap:4px;">${starIcon} Featured</span>` : ''}
        <span class="source">${p.source}</span>
      </a>
      <div class="product-body">
        <small class="eyebrow">${p.category}</small>
        <a href="/products/${p.slug}" class="product-title">${p.title}</a>
        <p>${p.description}</p>
        <div class="meta">
          <div class="rating">
            ${starIcon}
            <strong>${p.rating}</strong> <span>(${p.reviews})</span>
          </div>
          <div class="pc-creator">
            ${p.seller || "Creator"}
          </div>
        </div>
        <div class="bottom">
          <strong>${p.price}</strong>
          <a href="/products/${p.slug}">View Product &rarr;</a>
        </div>
      </div>
    </article>
  `;
}

// Function to generate Category Card HTML
function createCategoryCard(c) {
  const url = "/categories/" + c.name.toLowerCase().replaceAll(" ", "-");
  return `
    <a href="${url}" class="category-card">
      <img src="${c.icon}" alt="${c.name}" />
      <div>
        <b>${c.name}</b>
        <small>${c.count} products</small>
      </div>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>
    </a>
  `;
}

// Initialize Hero Slider
function initSlider() {
  const container = document.getElementById("slides-container");
  const navContainer = document.getElementById("slider-nav");
  let current = 0;

  // Render slides
  container.innerHTML = slides.map((slide, index) => `
    <div class="slide ${index === 0 ? "active" : ""}" data-index="${index}">
      <img src="${slide.bg}" alt="Background" class="slide-bg" />
      <div class="slide-overlay"></div>
      <div class="slide-content">
        <span class="slide-kicker">
          ${starIcon} ${slide.kicker}
        </span>
        <h1 class="slide-title">${slide.title}</h1>
        <p class="slide-desc">${slide.desc}</p>
        <div class="slide-actions">
          <a href="${slide.link}" class="btn-slide-primary">Explore Now &rarr;</a>
        </div>
      </div>
    </div>
  `).join("");

  // Render navigation dots
  navContainer.innerHTML = slides.map((_, index) => `
    <button class="slider-dot ${index === 0 ? "active" : ""}" data-index="${index}" aria-label="Go to slide ${index + 1}"></button>
  `).join("");

  const slideElements = container.querySelectorAll(".slide");
  const dotElements = navContainer.querySelectorAll(".slider-dot");

  function goToSlide(index) {
    slideElements[current].classList.remove("active");
    dotElements[current].classList.remove("active");
    current = index;
    slideElements[current].classList.add("active");
    dotElements[current].classList.add("active");
  }

  // Click events for dots
  dotElements.forEach((dot, index) => {
    dot.addEventListener("click", () => goToSlide(index));
  });

  // Auto advance
  setInterval(() => {
    let next = current === slides.length - 1 ? 0 : current + 1;
    goToSlide(next);
  }, 6000);
}

// Fetch products dynamically
async function loadDynamicProducts() {
  try {
    const res = await fetch("/api/products");
    const data = await res.json();
    if (data.products && data.products.length > 0) {
      products = data.products;
    }
  } catch (err) {
    console.error("Failed to fetch products:", err);
  }

  // Render Featured Products
  const featuredContainer = document.getElementById("featured-products");
  if(featuredContainer && products.length > 0) featuredContainer.innerHTML = products.slice(0, 5).map(p => createProductCard(p, true)).join("");

  // Render Newly Added Products
  const newContainer = document.getElementById("new-products");
  if(newContainer && products.length > 0) newContainer.innerHTML = products.slice().reverse().slice(0, 5).map(p => createProductCard(p)).join("");

  // Render Top Rated
  const topContainer = document.getElementById("top-products");
  if(topContainer && products.length > 0) topContainer.innerHTML = products.slice(1, 6).map(p => createProductCard(p)).join("");
}

// DOMContentLoaded Event
document.addEventListener("DOMContentLoaded", () => {
  initSlider();
  loadDynamicProducts();

  // Render Categories
  const categoryGrid = document.getElementById("category-grid");
  if (categoryGrid) categoryGrid.innerHTML = categories.map(c => createCategoryCard(c)).join("");
});
