"use server"
import {undefined, z} from "zod";
import {insertProductsSchema, products} from "@/lib/db/schemas/products";
import {currentUser} from "@/lib/auth";
import {db} from "@/lib/db";

export default async function AddProduct(data: z.infer<typeof insertProductsSchema>){
    // check if the user is logged in and is an admin
    const user = await currentUser();
    if(!user || user.role !== "ADMIN"){
        return {error: "Unauthorized"}
    }

    // checking if the data is valid
    const newData = insertProductsSchema.parse(data);

    // inserting the data into the database
    await db.insert(products).values({
        // @ts-ignore - for some reason, the type of product is not being inferred
        name: newData.name,
        description: newData.description,
        price: newData.price,
        image: newData.image,
        quantity: newData.quantity,
        userId: user.id,
    })

    return {success: "Product added!"}
}