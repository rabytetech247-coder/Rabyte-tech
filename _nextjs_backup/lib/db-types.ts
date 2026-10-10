export interface User {
    id: string;
    email: string;
    password_hash: string;
    name: string | null;
    username: string;
    avatar_url: string | null;
    bio: string | null;
    role: string;
    status: string;
    trust_score?: number;
    created_at: string;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    icon: string | null;
    seo_title: string | null;
    seo_description: string | null;
}

export interface Product {
    id: string;
    seller_id: string;
    category_id: string | null;
    title: string;
    slug: string;
    description: string | null;
    source_platform: string;
    source_url: string;
    canonical_url: string | null;
    source_price: number | null;
    source_currency: string | null;
    source_sales_count: number | null;
    source_rating: number | null;
    source_review_count: number | null;
    import_status: string;
    seo_score: number;
    status: string;
    created_at: string;
    updated_at: string;
}

export interface ProductImage {
    id: string;
    product_id: string;
    r2_key: string;
    alt_text: string | null;
    sort_order: number;
    source_type: string | null;
    created_at: string;
}

export interface ProductStat {
    product_id: string;
    page_views: number;
    unique_visitors: number;
    outbound_clicks: number;
    return_visitors: number;
    updated_at: string;
}

export interface Event {
    id: string;
    product_id: string;
    user_id: string | null;
    event_type: string;
    session_id: string | null;
    referrer: string | null;
    country_code: string | null;
    created_at: string;
}

export interface Rating {
    id: string;
    product_id: string;
    user_id: string;
    rating: number;
    review_text: string | null;
    status: string;
    created_at: string;
}

export interface Testimonial {
    id: string;
    product_id: string;
    user_id: string;
    content: string;
    status: string;
    created_at: string;
}
