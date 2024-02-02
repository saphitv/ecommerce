"use client"
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormField, FormItem, FormLabel} from "@/components/ui/form";

const formSchema = z.object({
    order: z.enum(["ascending", "descending"]),
    sortBy: z.enum(["price", "popularity", "rating"]),
    category: z.string()
})
export default function Filters(){
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            order: "descending",
            sortBy: "popularity",
            category: "All"
        },
    })

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data)
    }

    const submitOnChange = (data: string, onchange: (...event: any[]) => void) => {
        onchange(data)
        onSubmit(form.getValues())
    }

    const category = ["All", "T shirt", "Hoodie", "Pants", "Shoes", "Socks", "Underwear", "Accessories"]

    return (
        <div className="w-72 min-w-64 p-4">
            <Form {...form}>
                <form className='space-y-2' onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                control={form.control}
                name={"sortBy"}
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Sort by</FormLabel>
                        <Select value={field.value} onValueChange={data => submitOnChange(data, field.onChange)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder={"Select an order"}/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={'price'}>💰 Price</SelectItem>
                                <SelectItem value={'popularity'}>🔥 Popularity</SelectItem>
                                <SelectItem value={'rating'}>⭐️ Rating</SelectItem>
                            </SelectContent>
                        </Select>
                    </FormItem>
                )}
                />

                <FormField
                    control={form.control}
                    name={"order"}
                    render={({field}) => (
                      <FormItem>
                          <FormLabel>Order</FormLabel>
                          <Select value={field.value} onValueChange={data => submitOnChange(data, field.onChange)}>
                              <SelectTrigger className="w-full">
                                  <SelectValue placeholder={"Select an order"} className='flex'/>
                              </SelectTrigger>
                              <SelectContent>
                                  <SelectItem value={'ascending'}><span className='flex items-center justify-center'>⬆️ Ascending</span></SelectItem>
                                  <SelectItem value={'descending'}><span className='flex items-center justify-center'>⬇️ Descending</span></SelectItem>
                              </SelectContent>
                          </Select>
                      </FormItem>
                    )}
                />


                <FormField
                    control={form.control}
                    name={'category'}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            {category.map((cat) => (
                                    <Button key={cat}
                                            className={cn("flex items-center justify-between p-2 w-full")}
                                            variant={cat == field.value ? "secondary" : "ghost"}
                                            onClick={() => field.onChange(cat)}
                                            type="submit"
                                    >
                                        <span className="text-gray-600">{cat}</span>
                                        <span className="text-gray-600">0</span>
                                    </Button>

                            ))}
                        </FormItem>
                    )}
                />
                </form>

            </Form>
        </div>
    )
}