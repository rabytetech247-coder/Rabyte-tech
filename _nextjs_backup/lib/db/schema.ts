import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  username: text('username').notNull().unique(),
  avatarUrl: text('avatar_url'),
  bio: text('bio'),
  role: text('role').default('user').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const categories = sqliteTable('categories', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
});

export const products = sqliteTable('products', {
  id: text('id').primaryKey(),
  sellerId: text('seller_id').notNull().references(() => users.id),
  title: text('title').notNull(),
  description: text('description'),
  sourceUrl: text('source_url').notNull(),
  canonicalUrl: text('canonical_url'),
  sourcePrice: real('source_price').notNull().default(0),
  importStatus: text('import_status').default('draft').notNull(), // draft, pending, completed, failed
  status: text('status').default('active').notNull(), // active, inactive, banned
  categoryId: text('category_id').references(() => categories.id),
  primaryImageUrl: text('primary_image_url'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const events = sqliteTable('events', {
  id: text('id').primaryKey(),
  productId: text('product_id').notNull().references(() => products.id),
  eventType: text('event_type').notNull(), // 'view' or 'outbound_click'
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  visitorIpHash: text('visitor_ip_hash'), // for unique view counting
});

export const ratings = sqliteTable('ratings', {
  id: text('id').primaryKey(),
  productId: text('product_id').notNull().references(() => products.id),
  userId: text('user_id').notNull().references(() => users.id),
  rating: integer('rating').notNull(), // 1 to 5
  reviewText: text('review_text'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});
