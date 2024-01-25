"use client"
import {Product} from "@/lib/db/schemas/products";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {PlusIcon} from "@radix-ui/react-icons";
import Image from "next/image";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import {useRef, useState} from "react";


export default function Product({product}: {product: Product}){
    const [showModal, setShowModal] = useState(true)
    const cardRef = useRef(null)

    return (
        <>
                <Card id={product.name.replace(" ", "_")} className="mx-4 my-6 w-72 h-fit shadow-lg cursor-pointer rounded-lg bg-gray-50 p-4">
                    <CardHeader className="p-2">
                        <AspectRatio ratio={16 / 9}>
                            <Image src={product.image} alt={product.name}
                                   width={500} height={500}
                                   objectFit="cover"
                                   className="object-cover rounded-md w-full h-full"/>
                        </AspectRatio>
                    </CardHeader>

                    <CardContent className="h-fit p-2">
                        <div className="font-bold text-lg text-nowrap">{product.name}</div>
                        <div className="text text-gray-600">{product.price} CHF</div>
                    </CardContent>

                    <CardFooter className="p-2">
                        <Button className="w-full" onClick={() => setShowModal(!showModal)}>
                            Add to Card <PlusIcon className="ml-2 font-bold h-4 w-4"/>
                        </Button>
                    </CardFooter>
                </Card>
        </>
    )
}