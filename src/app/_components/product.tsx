"use client";
import { Product } from "@/lib/db/schemas/products";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useCart } from "@/hooks/use-cart";
import { PlusSquareIcon } from "lucide-react";

export default function Product({ product }: { product: Product }) {
  const { addProduct } = useCart();
  const handleAddToCart = () => {
    addProduct(product);
  };

  return (
    <>
      <Card className="h-fit min-w-64 flex-1 cursor-pointer rounded-lg bg-white p-2.5 shadow-lg">
        <CardHeader className="p-1">
          <AspectRatio ratio={16 / 9}>
            <Image
              src={product.image}
              alt={product.name}
              width={500}
              height={500}
              objectFit="cover"
              className="h-full w-full rounded-md object-cover"
            />
          </AspectRatio>
        </CardHeader>

        <CardContent className="flex h-fit items-center justify-between p-2">
          <div>
            <div className="text-nowrap text-lg font-bold">{product.name}</div>
            <div className="text text-gray-600">{product.price} CHF</div>
          </div>
          <Button className="items-center" onClick={handleAddToCart}>
            Add to Cart <PlusIcon className="h-6 w-6 font-bold" />
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
