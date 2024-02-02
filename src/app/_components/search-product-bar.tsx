"use client"

import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {ChangeEvent} from "react";
import {Form, FormField, FormItem} from "@/components/ui/form";
import {MagnifyingGlassIcon} from "@radix-ui/react-icons";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

const formSchema = z.object({
    search: z.string(),
})

export function SearchProductBar(){
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: "",
        },
    })

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const handleSubmit = (data: z.infer<typeof formSchema>) => {
        const current = new URLSearchParams(Array.from(searchParams.entries()))
        current.set("search", data.search)

        const search = current.toString();
        const query = search ? `?${search}` : "";

        router.push(`${pathname}${query}`)
    }

    const submitOnChange = (data: ChangeEvent<HTMLInputElement>, onchange: (...event: any[]) => void) => {
        onchange(data)
        handleSubmit(form.getValues())
    }

    return (
        <div className="flex flex-row w-full justify-center items-center px-8 py-10">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full flex space-x-4">
                    <div className='flex-1'>
                        <FormField
                            control={form.control} name={"search"}
                            render={({field}) => (
                                <FormItem>
                                    <div className="relative">
                                        <div
                                            className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <MagnifyingGlassIcon/>
                                        </div>
                                        <Input
                                            placeholder={'Tommy Jeans T-Shirt'}
                                            type={'text'}
                                            className="transition-all duration-200 ease-in-out min-w-20 w-full h-12
                                           block rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={field.onChange}
                                        />
                                    </div>

                                </FormItem>
                            )}
                        />
                    </div>

                    <Button className='h-12'>Search</Button>
                </form>
            </Form>
        </div>
    )
}