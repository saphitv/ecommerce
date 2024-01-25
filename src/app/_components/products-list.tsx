import { db } from '@/lib/db';
import {products} from "@/lib/db/schemas/products";
import Product from "@/app/_components/product";
export default async function ProductList(){
    const prods = await db.select().from(products)
    return (
        <div className="flex flex-row flex-wrap p-4 w-screen justify-start">
            {prods.map((prod) => (
                <Product key={prod.id} product={prod}/>
            ))}
        </div>
    )
}