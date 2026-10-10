DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS ratings;
DROP TABLE IF EXISTS testimonials;
DROP TABLE IF EXISTS product_stats;
DROP TABLE IF EXISTS product_images;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT,
    username TEXT UNIQUE NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    role TEXT DEFAULT 'user',
    status TEXT DEFAULT 'active',
    trust_score INTEGER DEFAULT 50,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    needs_password_reset INTEGER DEFAULT 0
);

CREATE TABLE categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    icon TEXT,
    seo_title TEXT,
    seo_description TEXT
);

CREATE TABLE products (
    id TEXT PRIMARY KEY,
    seller_id TEXT NOT NULL,
    category_id TEXT,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    source_platform TEXT NOT NULL,
    source_url TEXT NOT NULL,
    canonical_url TEXT,
    source_price REAL,
    source_currency TEXT,
    source_sales_count INTEGER,
    source_rating REAL,
    source_review_count INTEGER,
    import_status TEXT DEFAULT 'draft',
    seo_score INTEGER DEFAULT 0,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES users(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE product_images (
    id TEXT PRIMARY KEY,
    product_id TEXT NOT NULL,
    r2_key TEXT NOT NULL,
    alt_text TEXT,
    sort_order INTEGER DEFAULT 0,
    source_type TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE product_stats (
    product_id TEXT PRIMARY KEY,
    page_views INTEGER DEFAULT 0,
    unique_visitors INTEGER DEFAULT 0,
    outbound_clicks INTEGER DEFAULT 0,
    return_visitors INTEGER DEFAULT 0,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE events (
    id TEXT PRIMARY KEY,
    product_id TEXT NOT NULL,
    user_id TEXT,
    event_type TEXT NOT NULL,
    session_id TEXT,
    referrer TEXT,
    country_code TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE ratings (
    id TEXT PRIMARY KEY,
    product_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    rating INTEGER NOT NULL,
    review_text TEXT,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE testimonials (
    id TEXT PRIMARY KEY,
    product_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    content TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
