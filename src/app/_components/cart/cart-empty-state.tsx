import {ShoppingBasket} from "lucide-react";

export default function CartEmptyState() {
    return (
        <div className="flex h-full items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
                <ShoppingBasket className="w-24 h-24 text-primary"/>
                <h2 className="text-xl font-bold">Your cart is empty</h2>
                <p className="text-md text-center">Add some products to your cart before checking out</p>
            </div>
        </div>
    )
}