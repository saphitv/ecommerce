import {
  int,
  mysqlTableCreator,
  primaryKey,
  timestamp,
  unique,
  uniqueIndex,
  foreignKey,
  varchar,
} from "drizzle-orm/mysql-core";
import { users } from "@/lib/db/schemas/auth";
import { createInsertSchema } from "drizzle-zod";
import { type InferSelectModel } from "drizzle-orm";
import { z } from "zod";

export const mysqlTable = mysqlTableCreator(
  (name) => `${process.env.DB_PREFIX}${name}`,
);

export const products = mysqlTable("products", {
  id: int("id").notNull().primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 4000 }).notNull(),
  price: int("price").notNull(),
  quantity: int("quantity").notNull(),
  image: varchar("image", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),
  userId: varchar("userId", { length: 255 }).notNull(),
  stripeProductId: varchar("stripeProductId", { length: 255 }),
  stripePriceId: varchar("stripePriceId", { length: 255 }),
});

export const sales = mysqlTable("sales", {
  id: int("id").notNull().primaryKey().autoincrement(),
  userId: varchar("userId", { length: 255 }).notNull(),
  stripeInvoiceId: varchar("stripeInvoiceId", { length: 255 }).notNull(),
  stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 255 }),
  stripePaymentStatus: varchar("stripeStatus", { length: 255 }).notNull(),
  amount: int("amount").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),
});

export const productSales = mysqlTable(
  "productSales",
  {
    id: int("id").notNull().primaryKey().autoincrement(),
    productId: int("productId")
      .notNull()
      .references(() => products.id),
    saleId: int("saleId")
      .notNull()
      .references(() => sales.id),
    quantity: int("quantity").notNull(),
    unitPrice: int("unitPrice").notNull(),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),
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
