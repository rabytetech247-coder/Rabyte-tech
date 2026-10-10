# Vanilla HTML/JS Migration & Development Plan

This document outlines the detailed architecture and step-by-step plan for converting the Next.js application into a full-fledged, highly scalable Vanilla HTML/CSS/JS architecture, powered by Cloudflare Pages Functions.

## 1. Directory Architecture

To keep the project organized without a framework, we will use a strict, intuitive folder structure:

```text
/
├── _nextjs_backup/       # (Safe storage of old Next.js files and components)
├── css/
│   ├── globals.css       # Core styling
│   └── admin.css         # Admin-specific styling
├── js/
│   ├── components/       # Reusable Web Components
│   │   ├── header.js     # <template-header>
│   │   └── footer.js     # <template-footer>
│   ├── auth.js           # Handles JWT tokens, login state, and header UI
│   ├── api.js            # Wrapper for Cloudflare Functions (fetch wrapper)
│   ├── slider.js         # Hero slider logic
│   └── admin.js          # Admin dashboard logic (tables, actions)
├── functions/            # Cloudflare Pages Functions (The Backend API)
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login.js  # Authenticates user against D1, returns token
│   │   │   └── me.js     # Validates token, returns user role
│   │   ├── admin/
│   │   │   ├── index.js  # GET pending products, POST approve/reject
│   │   │   └── users.js  # Manage users
│   │   └── products.js   # GET products list or details
├── auth/
│   ├── login.html
│   ├── register.html
│   └── forgot-password.html
├── admin/
│   ├── index.html        # Admin Dashboard
│   ├── products.html     # Product moderation
│   └── users.html
├── user/
│   ├── dashboard.html    # Seller dashboard
│   └── submit.html       # Submit new product
├── products/
│   ├── index.html        # Product listing/search
│   └── detail.html       # Single product view (URL: /products/detail.html?id=123)
├── categories/
│   └── index.html
├── index.html            # The Main Homepage
└── schema.sql            # D1 Database Schema
```

## 2. Development Roadmap

### Phase 1: Core Setup & Templating (Completed)
- [x] Extract `header.js` and `footer.js` as Web Components.
- [x] Apply Web Components to `index.html`.
- [x] Move all Next.js specific files into `_nextjs_backup/`.
- [x] Establish the root directory as the static web root.
- [ ] Create the `/css/` and `/js/` folders and organize `styles.css` and `script.js` into them.

### Phase 2: Authentication System
- **Backend (`functions/api/auth/login.js`)**: 
  - Write a Cloudflare function that takes an email/password, queries the D1 database, verifies the hash, and returns a secure HTTP-only cookie or JWT.
- **Frontend (`/auth/login.html`)**:
  - Build the HTML form using our global CSS.
  - Intercept the form `submit` event via JavaScript, send a `fetch` request to the API.
- **State Management (`/js/auth.js`)**:
  - Write a script that runs on every page load to check if the user is logged in.
  - Dynamically update `<template-header>` to show "Dashboard" and "Logout" instead of "Login".

### Phase 3: The Admin Panel (Moderation System)
- **Backend (`functions/api/admin/products.js`)**:
  - Replicate `back/app/actions/admin-actions.ts`.
  - Ensure the API checks the user's role (must be `admin`).
  - Write queries to `UPDATE products SET status = 'active'` and update user trust scores.
- **Frontend (`/admin/index.html`)**:
  - Build a responsive table layout using HTML/CSS.
  - Use `fetch()` on page load to grab pending products.
  - Inject rows dynamically into the `<tbody>` using JavaScript template literals.
  - Attach click listeners to "Approve" and "Reject" buttons that trigger the API.

### Phase 4: Dynamic Products & Submission
- **Frontend (`/user/submit.html`)**:
  - Convert the React submission form to a standard HTML `<form>`.
  - Use JS `FormData` API to send data to `/functions/api/products` (POST).
- **Frontend (`/products/detail.html`)**:
  - Create a single template file for products.
  - Use `new URLSearchParams(window.location.search).get('id')` to read the product ID from the URL (e.g., `?id=nextjs-saas-template`).
  - Fetch that specific product data from D1 and inject it into the DOM.

## 3. Advantages of this Architecture
1. **Zero Build Step**: You can edit an HTML/JS file and refresh the browser instantly. No `npm run build` or `npm run dev` required for the frontend.
2. **True Full-Stack**: By utilizing Cloudflare `functions/`, you get a robust, serverless backend that talks directly to D1, without needing a heavy Node.js server.
3. **Template Reusability**: Using `<template-header>` gives you the DRY (Don't Repeat Yourself) benefits of React components, but natively in the browser.
4. **Easier Debugging**: You can inspect exactly what HTML and CSS is being loaded, with no hidden Next.js hydration or edge-runtime issues.
