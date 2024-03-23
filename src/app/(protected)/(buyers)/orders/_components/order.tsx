import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  GetProducts,
  Product,
  ProductSales,
  Sales,
} from "@/lib/db/schemas/products";
import { ShoppingBagIcon } from "lucide-react";

export default function Order({ order }: { order: GetProducts[] }) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <ShoppingBagIcon className="h-6 w-6" />
          <h1 className="text-lg font-semibold">Order #3210</h1>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img
            alt="Product Image"
            className="aspect-square object-cover"
            height={100}
            src="/placeholder.svg"
            width={100}
          />
          <div>
            <p className="font-semibold">Product Name</p>
            <p>Description of the product.</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p>Date: February 20, 2022</p>
          <p>Total: $42.25</p>
        </div>
        <div className="flex items-center justify-between">
          <p>Status: Shipped</p>
          <Button size="sm">View Details</Button>
        </div>
      </CardContent>
    </Card>
  );
}
