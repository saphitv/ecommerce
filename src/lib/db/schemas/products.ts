import {createInsertSchema} from "drizzle-zod";
import {type InferSelectModel, sql} from "drizzle-orm";
import {z} from "zod";
import {integer, sqliteTableCreator, text, unique} from "drizzle-orm/sqlite-core";

export const sqlitelTable = sqliteTableCreator(
  (name) => `${name}`,
);

export const products = sqlitelTable("products", {
  id: integer("id").notNull().primaryKey({autoIncrement: true}),
  name: text("name", { length: 255 }).notNull(),
  description: text("description", { length: 4000 }).notNull(),
  price: integer("price").notNull(),
  quantity: integer("quantity").notNull(),
  image: text("image", { length: 255 }).notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).default(sql`(CURRENT_TIMESTAMP)`),
  userId: text("userId", { length: 255 }).notNull(),
  stripeProductId: text("stripeProductId", { length: 255 }),
  stripePriceId: text("stripePriceId", { length: 255 }),
});

export const sales = sqlitelTable("sales", {
  id: integer("id").notNull().primaryKey({autoIncrement: true}),
  userId: text("userId", { length: 255 }).notNull(),
  stripeInvoiceId: text("stripeInvoiceId", { length: 255 }).notNull(),
  stripePaymentIntentId: text("stripePaymentIntentId", { length: 255 }),
  stripePaymentStatus: text("stripeStatus", { length: 255 }).notNull(),
  amount: integer("amount").notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).default(sql`(CURRENT_TIMESTAMP)`),
});

export const productSales = sqlitelTable(
  "productSales",
  {
    id: integer("id").notNull().primaryKey({autoIncrement: true}),
    productId: integer("productId")
      .notNull()
      .references(() => products.id),
    saleId: integer("saleId")
      .notNull()
      .references(() => sales.id),
    quantity: integer("quantity").notNull(),
    unitPrice: integer("unitPrice").notNull(),
    createdAt: integer("createdAt", { mode: "timestamp" }).default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: integer("updatedAt", { mode: "timestamp" }).default(sql`(CURRENT_TIMESTAMP)`),
  },
  (productSale) => ({
    unqiueIndex: unique().on(productSale.productId, productSale.saleId),
  }),
);

export type ProductSales = InferSelectModel<typeof productSales>;

export type ProductSale = Omit<ProductSales, "createdAt" | "updatedAt">;

export type Sales = InferSelectModel<typeof sales>;

export type Sale = Omit<Sales, "createdAt" | "updatedAt">;

export type Product = InferSelectModel<typeof products>;

export type ProductClient = Omit<Product, "userId" | "createdAt" | "updatedAt">;

export type ProductCart = Product & { cart_qty: number };

export const insertProductsSchema = createInsertSchema(products, {
  price: z
    .string()
    .refine((price) => parseInt(price) > 0, "Price must be greater than 0."),
  quantity: z
    .string()
    .refine(
      (quantity) => parseInt(quantity) > 0,
      "Quantity must be greater than 0.",
    ),
  image: z.any(),
});

export type GetProducts = {
  productSales?: ProductSales;
  sales?: Sales;
  products?: Product;
}[];
