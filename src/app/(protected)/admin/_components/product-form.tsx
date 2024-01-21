"use client"
import {useForm} from "react-hook-form";
import {insertProductsSchema} from "@/lib/db/schemas/products";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import AddProduct from "@/actions/admin/add-product";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import UploadImage from "@/components/upload-image";
import {toast} from "sonner";
import {useState} from "react";
import {useCurrentUser} from "@/hooks/use-current-user";
import {useRouter} from "next/navigation";

export default function ProductForm() {
    // should not be possible to access this page if not admin
    const user = useCurrentUser()!
    const router = useRouter()
    const form = useForm<z.infer<typeof insertProductsSchema>>({
        resolver: zodResolver(insertProductsSchema),
        defaultValues: {
            userId: user.id
        }
    })
    const [isButtonDisable, setIsButtonDisable] = useState(true)

    // handle form submit
    const onSubmit = (data: z.infer<typeof insertProductsSchema>) => {

        console.log("data form", data)

        AddProduct(data).then((res) => {
            if(res.success){
                toast.success("Product added")
                form.reset({
                    name: "",
                    description: "",
                    price: "",
                    quantity: "",
                    image: ""
                })
                router.refresh()

            } else {
                if(res.error == "Unauthorized")
                    toast.error("You are not authorized to do this action")
                else
                    toast.error("An error occurred")
            }

        })
    }

    // handle upload image complete
    const onUploadComplete = (res: any) => {
        toast.success("Upload Completed")

        setIsButtonDisable(false)
        form.setValue('image', res[0].url)
    }

    return (
        <Form {...form}>
            <h2 className="text-2xl font-bold">➕ Add Product </h2>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3 w-1/2'>
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Ex. Tommy Jeans T-shirt" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='description'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder={'Really comfortable'} className="h-32" {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="price"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <Input placeholder="Ex. 100 CHF" {...field} type="number"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="quantity"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Quantity</FormLabel>
                            <FormControl>
                                <Input placeholder="Ex. 10 unit" {...field} type="number" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name={'image'}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Image</FormLabel>
                            <FormControl>
                                <UploadImage onUploadComplete={onUploadComplete}/>
                            </FormControl>
                            <FormDescription>
                                An image is required to unlock the form
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isButtonDisable}>Submit</Button>
            </form>
        </Form>
    )
}