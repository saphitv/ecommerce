import { currentUser } from "@/lib/auth";
import { GetProducts, productSales, products, sales } from "@/lib/db/schemas/products";
import { getBaseUrl } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import Order from "./_components/order";
import {PackageIcon, ShoppingBagIcon} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default async function Page() {
  const user = await currentUser();
  if (!user) return redirect(getBaseUrl() + "/login");
  let ordersHash: { [key: string]: GetProducts } = {};
  const orders = (await db
    ?.select()
    .from(productSales)
    .leftJoin(sales, eq(productSales.saleId, sales.id))
    .leftJoin(products, eq(products.id, productSales.productId))
    .where(eq(sales.userId, user.id))) as any as GetProducts;

  for (let order of orders) {
    if(!order.productSales) {
      console.warn("Order does not have a productSale", order)
      continue;
    };
    if (!ordersHash.hasOwnProperty(order.productSales?.saleId))
      ordersHash[order.productSales.saleId] = [];
    ordersHash[order.productSales.saleId].push(order);
  }

  return (
    <div className='mt-4 mx-4'>
      <Card className='mb-4'>
        <CardContent className="flex flex-col gap-2 pt-4">
          <div className="flex items-center gap-2">
            <ShoppingBagIcon className="h-6 w-6" />
            <h1 className="font-semibold text-lg">My Orders</h1>
          </div>
          <p className="text-sm leading-none md:text-base">
            Here are all the orders you&apos;ve made. Click on an order to view details.
          </p>
        </CardContent>
      </Card>
      <div className='space-y-4'>

        {ordersHash  && Object.entries(ordersHash).length > 0 ?
            Object.entries(ordersHash).map(
                ([key, value], index) => <Order key={index} order={value} />
            )
        : <EmptyOrderState />
        }
      </div>
    </div>
  );
}

function EmptyOrderState(){
  return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <div className="bg-gray-100 rounded-full p-6 dark:bg-gray-800">
          <PackageIcon className="w-12 h-12 text-gray-500 dark:text-gray-400"/>
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold tracking-tight">No Orders Yet</h3>
          <p className="text-gray-500 dark:text-gray-400">
            You haven't placed any orders. Start shopping to see your orders here.
          </p>
        </div>
      </div>
  )
}