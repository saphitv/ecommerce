import {products} from "@/lib/db/schemas/products";
import {createClient} from "@libsql/client";
import {drizzle} from "drizzle-orm/libsql";
import {schema} from "@/lib/db";

const getServerStripe = () => {
    return require("stripe")("STRIPE_PRIVATE_KEY")
};

const client = createClient({
    url: 'http://127.0.0.1:8080',
    //url: process.env.TURSO_CONNECTION_URL!,
    //authToken: process.env.TURSO_AUTH_TOKEN!,
})

const db = drizzle(client, {schema: schema})


let stillProduct = true;
let lastProduct = null;
while (stillProduct) {
    // @ts-ignore
    let config = {
        limit: 100,
        starting_after: undefined

    }
    if (lastProduct != null) {
        config.starting_after = lastProduct;
    }

    const res = await getServerStripe().products.list(config)

    if (res.data.length === 0) {
        stillProduct = false;
        break;
    }

    // @ts-ignore
    for (const product of res.data.filter(product => product.active)) {
        const priceRes = await getServerStripe().prices.list({
            product: product.id,
            limit: 1
        })

        console.log(product, priceRes.data)

        // @ts-ignore
        const _ = await db.insert(products).values({
            stripeProductId: product.id as any as string,
            name: product.name,
            description: product.description,
            image: product.images[0],
            userId: "96d3bcf0-8e0e-4d4b-a7df-36b8deee73c4",
            quantity: product.metadata.quantity ?? 1,
            price: priceRes.data[0].unit_amount / 100,
            stripePriceId: priceRes.data[0].id
        })



    }

    lastProduct = res.data[res.data.length - 1].id;
}

