import { Stripe } from "@stripe/stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";

let stripePromise: Promise<Stripe | null>;
const getStripe = (): Promise<Stripe> => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);
  }
  return stripePromise as Promise<Stripe>;
};

export const getServerStripe = () => {
  return require("stripe")(process.env.STRIPE_SECRET_KEY);
};

export default getStripe;
