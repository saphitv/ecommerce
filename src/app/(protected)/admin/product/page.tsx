import ProductTable from "@/app/(protected)/admin/product/_components/product-table";
import {Suspense} from "react";

export default async function ProductsPage(){
    return (
        <div className="w-full p-12 container space-y-6">
            <h2 className="text-2xl font-bold">💻 Manage Products</h2>
            <Suspense fallback={<div>Loading...</div>}>
                <ProductTable/>
            </Suspense>
        </div>
    )
}