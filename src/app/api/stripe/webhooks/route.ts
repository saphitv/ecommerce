import { db } from "@/lib/db";
import { productSales, products, sales } from "@/lib/db/schemas/products";
import { getServerStripe } from "@/lib/stripe";
import { eq } from "drizzle-orm";
import { Session } from "next-auth/types";

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");

  if(!sig) {
    return new Response("No stripe signature", {
      status: 400,
    });
  }

  try {
    getServerStripe().webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_SECRET_KEY,
    );
  } catch (err: any) {
    new Response(`Webhook Error: ${err.message}`);
  }

  try {
    const text = JSON.parse(await req.text());

    switch (text.type) {
      //case "charge.succeeded":
      // is not shure that he paid
      case "checkout.session.completed":
        // Payment is successful and he paid
        const session = text.data.object;

        const user = JSON.parse(session.metadata.user) as Session["user"];

        // insert the sales into the database
        await db.insert(sales).values({
          amount: session.amount_total,
          stripeInvoiceId: session.invoice,
          stripePaymentIntentId: session.payment_intent,
          stripePaymentStatus: session.payment_status,
          userId: user.id,
        });

        const saleId = (
          await db
            .select({ id: sales.id })
            .from(sales)
            .where(eq(sales.stripeInvoiceId, session.invoice))
            .limit(1)
        )[0].id;

        console.log("sales", {
          id: saleId,
          amount: session.amount_total,
          stripeInvoiceId: session.invoice,
          stripePaymentIntentId: session.payment_intent,
          stripePaymentStatus: session.payment_status,
          userId: user.id,
        });

        void await getServerStripe().invoices.retrieve(
          session.invoice,
            async (err: any, invoice: any) => {
            console.log("invoice", invoice)
            if (err) {
              console.error(err);
            }

            const data = invoice.lines.data;

            // console.log("data inv", data);

            void await data.forEach(async (line: any) => {
              const product = (await db
                  .select({ id: products.id })
                  .from(products)
                  .where(eq(products.stripePriceId, line.price.id))
                  .limit(1)
              )[0];

              const prodSale = {
                productId: product.id,
                quantity: line.quantity,
                saleId: saleId,
                unitPrice: line.price.unit_amount,
              };

              console.log("line", prodSale);


              void await db.insert(productSales).values(prodSale);

            });
          },
        );

        return new Response("Success!", {
          status: 200,
        });

        break;
    }
  } catch (error: any) {
    return new Response(`Webhook error: ${error.message}`, {
      status: 400,
    });
  }
}

export function GET() {
  return new Response("Success");
}
