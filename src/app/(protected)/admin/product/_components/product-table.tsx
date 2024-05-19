import { columns } from "./columns"
import { DataTable } from "./data-table"
import {Product, products} from "@/lib/db/schemas/products";
import {db} from "@/lib/db";

async function getData(): Promise<Product[]> {
    // const user = (await currentUser())!


    // @ts-ignore the type definitions for drizzle-orm are incorrect
    return db.select({
        name: products.name,
        price: products.price,
        description: products.description,
        image: products.image,
        userId: products.userId,
        createdAt: products.createdAt,
        updatedAt: products.updatedAt,
    }).from(products)
        // .where(eq(products.userId, user.id));
}

export default async function ProductTable() {
    const data = (await getData())

    return (
            <DataTable columns={columns} data={data} />
    )
}
