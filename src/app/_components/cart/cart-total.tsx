import {useCart} from "@/hooks/use-cart";
import {Button} from "@/components/ui/button";

export function CartTotal(){
    const { totalPrice, checkout } = useCart()

    const handleCheckout = () => {
        checkout()
    }

    return (
        <div className='absolute bottom-0 bg-white border-t-2 border-slate-100 w-full right-0 flex h-20  px-4 justify-between items-center'>
            <div className='flex items-center space-x-2'>
                <h3 className='text-gray-700 text-md'>Total</h3>
                <p className='font-bold text-xl'>{totalPrice} CHF</p>
            </div>
            <div>
                <Button variant='default' onClick={handleCheckout} >Checkout</Button>
            </div>

        </div>
    )
}