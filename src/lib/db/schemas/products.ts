import {int, mysqlTableCreator, primaryKey, timestamp, varchar} from "drizzle-orm/mysql-core";
import {users} from "@/lib/db/schemas/auth";
import {createInsertSchema} from "drizzle-zod";
import { type InferSelectModel } from 'drizzle-orm'
import {z} from "zod";

export const mysqlTable = mysqlTableCreator((name) => `${process.env.DB_PREFIX}${name}`);

export const products = mysqlTable("products", {
    id: int("id").notNull().primaryKey().autoincrement(),
    name: varchar("name", {length: 255}).notNull(),
    description: varchar("description", { length: 4000}).notNull(),
    price: int("price").notNull(),
    quantity: int("quantity").notNull(),
    image: varchar("image", {length: 255}).notNull(),
    createdAt: timestamp("createdAt", {mode: "date"}).defaultNow(),
    updatedAt: timestamp("updatedAt", {mode: "date"}).defaultNow(),
    userId: varchar("userId", {length: 255}).notNull(),
}, (product) => ({
    compoundKey: primaryKey({
        columns: [product.userId, users.id],
    }),
}))

export type Product = InferSelectModel<typeof products>

export const insertProductsSchema = createInsertSchema(products, {
    price: z.string()
        .refine((price) => parseInt(price) > 0, "Price must be greater than 0."),
    quantity: z.string()
        .refine((quantity) => parseInt(quantity) > 0, "Quantity must be greater than 0."),
    image: z.any(),
})