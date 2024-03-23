"use client"
import {useCart} from "@/hooks/use-cart";
import {DateTime} from "luxon";

export function NumberOfItemsInCart() {
    const { totalItems } = useCart()

    return (
        <span
            className='text-md flex items-center justify-center'>
                    {totalItems}
        </span>
    );
}