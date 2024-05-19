"use client"
import {retrieveCheckoutSession} from "@/actions/stripe/stripe-session";
import {useSearchParams} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import {CheckCircleIcon, XCircleIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useCart} from "@/hooks/use-cart";
import Cookies from "js-cookie";
import Link from "next/link";
import {Skeleton} from "@/components/ui/skeleton";

export default function Page() {
    const searchParams = useSearchParams()

    const current = new URLSearchParams(Array.from(searchParams.entries()))

    const {data, isLoading} = useQuery({
        queryKey: ["checkout", "return"],
        queryFn: () => retrieveCheckoutSession(current.get("session_id")!)
    })

    const isSuccessful = current.get("success") === "true" || !data?.error

    if(data?.status == "complete") {
        Cookies.remove("cart")
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-4 md:p-8">
            <div className="flex flex-col items-center space-y-6 text-center">
                {isSuccessful || isLoading ?
                    <>
                        <CheckCircleIcon className="h-12 w-12 text-green-500"/>
                        <div className="space-y-4">
                            <h1 className="font-bold text-3xl">Thank you for your order!</h1>
                            {data?.customer_email ? <p className="text-gray-500 dark:text-gray-400">Your order has been confirmed and will be
                                processed soon. We have sended the receipt at {data?.customer_email}</p> :
                            <Skeleton className='h-[20px] w-[400px]' />
                            }
                        </div>
                    </> :
                    <>
                        <XCircleIcon className='h-12 w-12 text-red-500'/>
                        <div className="space-y-4">
                            <h1 className="font-bold text-3xl">The order was cancelled!</h1>
                            <p className="text-gray-500 dark:text-gray-400">Your order has been cancelled and you have not been charged.</p>
                        </div>
                    </>
                }

                <div className='flex gap-4'>
                    <Link href={'/'}><Button size={"lg"} variant='secondary'>Continue Shopping</Button></Link>
                    <Link href={'/orders'}><Button size={"lg"}>View order</Button></Link>
                </div>

            </div>
        </div>
    );
}
