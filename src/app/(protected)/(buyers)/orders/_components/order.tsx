"use client"
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel";
import {
    GetProducts,
    Product,
    ProductSales,
    Sales,
} from "@/lib/db/schemas/products";
import {ShoppingBagIcon} from "lucide-react";
import {DateTime} from "luxon";
import Image from "next/image";
import {useEffect, useState} from "react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {white} from "next/dist/lib/picocolors";

export default function Order({order}: { order: GetProducts }) {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (api) {
            setCount(api.scrollSnapList().length)
            setCurrent(api.selectedScrollSnap() + 1)

            api.on("select", () => {
                setCurrent(api.selectedScrollSnap() + 1)
            })
        }


    }, [api])


    return (
        <Card>
            <CardContent className="px-16 pt-6 pb-2">
                <div className="flex space-x-20">
                    <div>
                        <Carousel setApi={setApi} opts={{loop: true, align: "center"}} className='w-fit'>
                            <CarouselContent className='w-[300px]'>
                                {order.map(o => (
                                    <>
                                        {o.products?.image && <CarouselItem key={o.products?.id}>
                                            <Image
                                                src={o.products?.image}
                                                alt={'Image product' + o.products?.name}
                                                width={300}
                                                height={300}
                                                objectFit="cover"
                                                className="rounded-md object-cover aspect-square"
                                            />
                                        </CarouselItem>}
                                    </>))}
                            </CarouselContent>
                            <CarouselPrevious/>
                            <CarouselNext/>
                        </Carousel>
                        <div className="py-2 text-center text-sm text-muted-foreground">
                            Slide {current} of {count}
                        </div>
                    </div>
                    {current && (
                        <div className='flex flex-col justify-between mb-4 w-full'>
                            <div className=''>
                                <h1 className="text-lg font-bold">Order
                                    #{order[0].sales?.id} - {DateTime.fromSQL(order[0].sales?.createdAt!).toLocaleString({
                                        weekday: "long",
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric"
                                    })}</h1>
                                <div>

                                    <p className="font-semibold text-gray-800 mt-1">{order[current - 1]?.products?.name} - {(order[current - 1]?.productSales?.unitPrice ?? 0) / 100} CHF (x{order[current - 1]?.productSales?.quantity})</p>
                                    <p className='text-gray-600 leading-6'>{order[current - 1]?.products?.description}</p>
                                </div>
                            </div>

                            <div className='flex w-full justify-between'>
                                <div></div>
                                <TooltipProvider skipDelayDuration={1000} delayDuration={300}>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Button disabled={true}>Total: {(order[0].sales?.amount ?? 0) / 100} CHF</Button>
                                        </TooltipTrigger>
                                        <TooltipContent className='bg-white text-gray-700 border-gray-200 border-2'>
                                            <p>This is feature its not implemented</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                    )}

                </div>
            </CardContent>
        </Card>
    );
}
