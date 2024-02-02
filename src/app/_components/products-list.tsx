"use client"

import Product from "@/app/_components/product";
import {getProducts} from "@/actions/buyers/products";
import {useQuery} from "@tanstack/react-query";
import {useSearchParams} from "next/navigation";
import {ExclamationTriangleIcon} from "@radix-ui/react-icons";
export default function ProductList(){
    const searchParams = useSearchParams()
    const {data: prods, isSuccess, isLoading, isError} = useQuery({
        queryKey: ["products", {search: searchParams.get("search")}],
        queryFn: () => getProducts({search: searchParams.get("search")})
    })

    return (
        <div className="flex-auto px-4">
            <div className="flex flex-row flex-wrap gap-6 justify-center ">
                {isSuccess && prods.map((prod) => (
                    <Product key={prod.id} product={prod}/>
                ))}
                {isLoading && Array(10).fill(0).map(i => (
                    <div key={i} className="flex-1 min-w-64 shadow-lg rounded-lg h-64 bg-gray-100 animate-pulse"></div>
                ))}
                {isError && <div className="text-red-500 flex font-bold text-2xl items-center gap-x-4"><ExclamationTriangleIcon width={20} height={30}/>Something went wrong</div>}
            </div>

        </div>
    )
}