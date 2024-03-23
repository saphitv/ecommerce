import {useCart} from "@/hooks/use-cart";
import Image from "next/image";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Trash2Icon} from "lucide-react";
import {ProductCart} from "@/lib/db/schemas/products";
import {z, ZodError} from "zod";
import {toast} from "sonner";

const qtySchema = z.object({
    qty: z.number().min(1).max(10),

})

export function ProductCart({product}: { product: ProductCart }){
    const { deleteProduct, updateProduct} = useCart()

    const handleDeleteProduct = () => {
        deleteProduct(product)
    }

    const handleUpdateProductQty = (qty: number) => {
        if(isNaN(qty)) {
            updateProduct({id: product.id, cart_qty: 0})
            return toast.warning('Please enter a valid number', { position: 'bottom-left'})
        }

        const value = qtySchema.safeParse({qty})

        if(value.success) {
            updateProduct({id: product.id, cart_qty: qty})
        } else {
            console.log(value.error.issues[0].message)
            toast.warning(value.error.issues[0].message, { position: 'bottom-left'})
        }
    }

    return (
        <div className='flex w-full justify-between px-4 py-4 transition-all rounded-md'>
            <div className='flex space-x-2'>
                <Image
                    src={product.image}
                    width={80}
                    height={60}
                    alt={'product image'}
                    className='rounded-lg w-20 h-16 object-cover'
                    objectFit={'cover'}
                />
                <div>
                    <h3 className='font-bold text-md'>{product.name}</h3>
                    <p className='text-sm text-gray-500'>{product.price} CHF</p>
                </div>
            </div>
            <div className='flex items-center justify-center space-x-2'>
                <Input type={'number'} value={product.cart_qty ?? 0}
                       className='w-12 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                       min={1} max={10}
                       onChange={el => handleUpdateProductQty(parseInt(el.target.value))}
                />
                <Button variant='ghost' className='text-red-500' onClick={handleDeleteProduct}>
                    <Trash2Icon color='red' size={20}/>
                </Button>
            </div>

        </div>
    )
}