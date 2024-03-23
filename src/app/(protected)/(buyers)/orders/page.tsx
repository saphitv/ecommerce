import { currentUser } from "@/lib/auth";
import { GetProducts, productSales, products, sales } from "@/lib/db/schemas/products";
import { getBaseUrl } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import Order from "./_components/order";
import { ShoppingBagIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default async function Page() {
  const user = await currentUser();
  if (!user) return redirect(getBaseUrl() + "/login");
  let ordersHash: { [key: string]: GetProducts[] } = {};
  const orders: GetProducts[] = (await db
    ?.select()
    .from(productSales)
    .leftJoin(sales, eq(productSales.saleId, sales.id))
    .leftJoin(products, eq(products.id, productSales.productId))
    .where(eq(sales.userId, user.id))) as any as GetProducts[];

  for (let order of orders) {
    if (!ordersHash.hasOwnProperty(order.productSales?.saleId))
      ordersHash[order.productSale.saleId] = [];
    ordersHash[order.productSales.saleId].push(order);
  }

  console.log(user, orders);
  return (
    <div>
      <Card>
        <CardContent className="flex flex-col gap-2 pt-4">
          <div className="flex items-center gap-2">
            <ShoppingBagIcon className="h-6 w-6" />
            <h1 className="font-semibold text-lg">My Orders</h1>
          </div>
          <p className="text-sm leading-none md:text-base">
            Here are all the orders you've made. Click on an order to view details.
          </p>
        </CardContent>
      </Card>
      <div>
        {ordersHash &&
          ordersHash.forEach(
            (key, order: any[]) => ordersHash[key] = <Order order={order} />),
          )}
      </div>
    </div>
  );
}
