"use client";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartTotal } from "@/app/_components/cart/cart-total";
import { NumberOfItemsInCart } from "@/app/_components/cart/cart-number-items";
import { CartContent } from "@/app/_components/cart/cart-content";
import { useCart } from "@/hooks/use-cart";
import CartEmptyState from "@/app/_components/cart/cart-empty-state";

export default function Cart() {
  const { removeUnsettedProducts, totalItems } = useCart();
  const handleChangeOpen = (isOpen: boolean) => {
    if (!isOpen) {
      removeUnsettedProducts();
    }
  };

  return (
    <Sheet onOpenChange={handleChangeOpen}>
      <SheetTrigger asChild>
        <Button className="ml-0 flex space-x-1" variant="ghost">
          <NumberOfItemsInCart />

          <ShoppingCart />
        </Button>
      </SheetTrigger>

      <SheetContent className="w-[500px] min-w-0 sm:max-w-none">
        <SheetHeader>
          <SheetTitle className="left-0">Cart Summary</SheetTitle>
        </SheetHeader>
        {totalItems > 0 ? (
          <>
            <CartContent />
            <SheetFooter>
              <CartTotal />
            </SheetFooter>
          </>
        ) : (
          <CartEmptyState />
        )}
      </SheetContent>
    </Sheet>
  );
}
