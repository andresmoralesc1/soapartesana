import { pgTable, serial, text, timestamp, boolean, decimal, integer, jsonb } from 'drizzle-orm/pg-core';

// Users table (for admin access)
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  name: text('name').notNull(),
  role: text('role').notNull().default('admin'), // 'admin' or 'customer'
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Products table
export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  category: text('category').notNull(), // 'pet-care', 'facial', 'terapeutico', 'energetico'
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  description: text('description').notNull(),
  fullDescription: text('full_description'),
  image: text('image').notNull(),
  images: jsonb('images').$type<string[]>(),
  featured: boolean('featured').default(false).notNull(),
  inStock: boolean('in_stock').default(true).notNull(),
  handmade: boolean('handmade').default(true).notNull(),
  ingredients: jsonb('ingredients').$type<string[]>(),
  benefits: jsonb('benefits').$type<string[]>(),
  dimensions: text('dimensions'),
  weight: text('weight'),
  badge: text('badge'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Orders table
export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  stripeCheckoutId: text('stripe_checkout_id').unique(),
  stripePaymentIntentId: text('stripe_payment_intent_id').unique(),
  customerName: text('customer_name').notNull(),
  customerEmail: text('customer_email').notNull(),
  customerPhone: text('customer_phone'),
  shippingAddress: jsonb('shipping_address').$type<{
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }>(),
  total: decimal('total', { precision: 10, scale: 2 }).notNull(),
  currency: text('currency').default('USD').notNull(),
  status: text('status').notNull().default('pending'), // 'pending', 'paid', 'shipped', 'delivered', 'cancelled'
  paymentStatus: text('payment_status').notNull().default('pending'), // 'pending', 'succeeded', 'failed'
  items: jsonb('items').notNull().$type<Array<{
    productId: number;
    name: string;
    quantity: number;
    price: string;
  }>>(),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Contact messages table
export const contactMessages = pgTable('contact_messages', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  subject: text('subject'),
  message: text('message').notNull(),
  read: boolean('read').default(false).notNull(),
  replied: boolean('replied').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Types for TypeScript
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type NewContactMessage = typeof contactMessages.$inferInsert;
