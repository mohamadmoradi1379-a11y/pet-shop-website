import { pgTable, text, timestamp, uuid, integer, boolean, decimal } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  image: text("image"),
  slug: text("slug").notNull().unique(),
  order: integer("order").default(0),
});

export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  price: decimal("price", { precision: 12, scale: 0 }).notNull(),
  discountPrice: decimal("discount_price", { precision: 12, scale: 0 }),
  image: text("image").notNull(),
  categoryId: uuid("category_id").references(() => categories.id),
  isAmazing: boolean("is_amazing").default(false),
  stock: integer("stock").default(0),
  rating: decimal("rating", { precision: 3, scale: 1 }).default("0.0"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const banners = pgTable("banners", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title"),
  image: text("image").notNull(),
  link: text("link"),
  type: text("type").default("main"), // main, side, etc.
  order: integer("order").default(0),
});
