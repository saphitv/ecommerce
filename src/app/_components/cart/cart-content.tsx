import { useCart } from "@/hooks/use-cart";
import { Product } from "@/lib/db/schemas/products";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { ProductCart } from "@/app/_components/cart/cart-product";

export function CartContent() {
  const { cart } = useCart();
  return (
    <div className="overflow-y-scroll py-4">
      {cart?.map((item, i, arr: Product[]) => {
        return (
          <div key={item.id} className="">
            <ProductCart product={item} />
            {i < arr.length - 1 && <Separator />}
          </div>
        );
      })}
    </div>
  );
}
