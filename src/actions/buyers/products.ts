"use server"

import {db} from "@/lib/db";
import {products} from "@/lib/db/schemas/products";
import {like} from "drizzle-orm";

export async function getProducts({search}: { search?: string | null }) {
    if(!search) return db.select().from(products)

    return db.select().from(products).where(like(products.name, `${search}%`))
}