"use client";
import {Product} from "@/lib/db/schemas/products";
import {Button} from "@/components/ui/button";
import {PlusIcon} from "@radix-ui/react-icons";
import Image from "next/image";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import {useCart} from "@/hooks/use-cart";
import {Toggle} from "@/components/ui/toggle";
import {Heart} from "lucide-react";
import {useState} from "react";
import {cn} from "@/lib/utils";
import {Separator} from "@/components/ui/separator";

export default function Product({product}: { product: Product }) {
    const [isFavourite, setIsFavourite] = useState(false)
    const {addProduct} = useCart();
    const handleAddToCart = () => {
        addProduct(product);
    };

    return (
        <>
            <div
                className="flex-[0, 0, 25%] h-fit min-w-80 max-w-[500px] sm:w-full lg:w-fit cursor-pointer rounded-lg bg-white p-2.5 space-y-4">
                <div className='w-full'>

                    <AspectRatio ratio={16 / 9}>
                        <Image
                            src={product.image}
                            alt={product.name}
                            width={800}
                            height={800}
                            objectFit="cover"
                            className="h-full w-full rounded-md object-cover"
                        />
                        <Button onClick={e => setIsFavourite(prev => !prev)} className='bg-transparent hover:bg-transparent py-1 min-[400px]:py-2 px-2 min-[400px]:px-4 cursor-pointer rounded-lg font-medium text-base leading-7 text-white absolute top-2 right-0 z-10' variant='ghost'>
                            <Heart className={cn('w-10 h-5', isFavourite ? 'text-red-500' : 'text-white')}/>
                        </Button>
                    </AspectRatio>
                </div>

                <div>
                    <div className='mb-3'>
                        <div className="text-nowrap text-lg font-bold">{product.name}</div>
                        <div className="text text-gray-600">{product.price} CHF</div>
                    </div>
                    <Button className="w-full" onClick={handleAddToCart} variant='secondary'>
                        Add to Cart <PlusIcon className="h-6 w-6 font-bold"/>
                    </Button>
                </div>
            </div>
        </>
    );
}
