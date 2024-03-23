"use server";
import { getBaseUrl } from "@/lib/utils";
import { getServerStripe } from "@/lib/stripe";
import { redirect, RedirectType } from "next/navigation";
import { currentUser } from "@/lib/auth";

export async function createCheckoutSession(
  items: { price: string; quantity: number }[],
) {
  const user = await currentUser();
  if (items === undefined || items.length === 0)
    throw new Error("No items to checkout");
  // Create Checkout Sessions from body params.
  const session = await getServerStripe().checkout.sessions.create({
    //ui_mode: 'embedded',
    line_items: [...items],
    invoice_creation: {
      enabled: true,
    },
    metadata: {
      user: JSON.stringify(user),
    },
    mode: "payment",
    /* return_url:
            `${getBaseUrl()}/return?session_id={CHECKOUT_SESSION_ID}`,"/
         */
    success_url: `${getBaseUrl()}/return?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${getBaseUrl()}/return?success=false&session_id={CHECKOUT_SESSION_ID}`,
  });

  redirect(session.url, RedirectType.replace);

  // return {clientSecret: session.client_secret}
}

export async function retrieveCheckoutSession(sessionId: string) {
  try {
    const session =
      await getServerStripe().checkout.sessions.retrieve(sessionId);

    return {
      status: session.status,
      customer_email: session.customer_details.email,
    };
  } catch (err: any) {
    return { error: err.message };
  }
}
