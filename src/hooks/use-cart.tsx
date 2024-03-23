import Cookies from "js-cookie";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {Product, ProductCart} from "@/lib/db/schemas/products";
import {DateTime} from "luxon";
import {createCheckoutSession} from "@/actions/stripe/stripe-session";

export function useCart(){
    const queryClient = useQueryClient()
    const { data, isLoading} = useQuery({
        queryKey: ['cart'],
        queryFn: () => {
            return {
                cart: JSON.parse(Cookies.get('cart') as string || '[]') as ProductCart[],
                totalPrice: JSON.parse(Cookies.get('cart') as string || '[]').reduce((acc: number, item: any) => acc + (item.price * item.cart_qty), 0),
                totalItems: JSON.parse(Cookies.get('cart') as string || '[]').reduce((acc: number, item: any) => acc + item.cart_qty, 0),
                refresh: DateTime.now().toISO()
            }
        },
    })

    const { mutate: mutateProduct} = useMutation({
        mutationKey: ['cart'],
        mutationFn: (products: ProductCart[]) => {
            Cookies.set("cart",
                JSON.stringify(products)
            )

            return Promise.resolve(products)
        },
        onSuccess: (products) => {
            void queryClient.setQueryData(['cart'], (_) => {
                return {
                    products: products,
                    totalPrice: products.reduce((acc: number, item: any) => acc + (item.price * item.cart_qty), 0),
                    totalItems: products.reduce((acc: number, item: any) => acc + item.cart_qty, 0),
                    refresh: DateTime.now().toISO()
                }
            })

            void queryClient.invalidateQueries({ queryKey: ['cart']})
        }
    })

    const addProduct = (product: Partial<ProductCart>) => {
        if(data?.cart?.find((p: ProductCart) => p.id === product.id)){
            mutateProduct(data?.cart.map((p: ProductCart) => {
                if(p.id === product.id){
                    p.cart_qty += 1
                }

                return {...p}
            }))
            return
        }

        mutateProduct([...data?.cart ?? [], {...product, cart_qty: 1}] as ProductCart[])
    }

    const deleteProduct = (product: Product) => {
        mutateProduct(data?.cart?.filter((p: ProductCart) => p.id !== product.id) as ProductCart[])
    }

    const updateProduct = (product: Partial<ProductCart>) => {
        mutateProduct(data?.cart?.map((p: ProductCart) => {
            if(p.id === product.id){
                return {...p, ...product}
            }
            return {...p}
        }) as ProductCart[])
    }

    const clearCart = () => {
        mutateProduct([], {
            onError: (error) => {
                console.error(error)
            }
        })
    }

    const removeUnsettedProducts = () => {
        mutateProduct(data?.cart?.filter((p: ProductCart) => p.cart_qty !== 0) as ProductCart[])
    }

    const getCartItemsForCheckout = () => {
        return data?.cart?.filter(p => p.stripePriceId != null).map((p: ProductCart) => {
            return {
                price: p.stripePriceId as string,
                quantity: p.cart_qty
            }
        })
    }

    const checkout = () => {
        void createCheckoutSession(getCartItemsForCheckout() ?? [])
    }

    return {
        cart: data?.cart,
        addProduct,
        deleteProduct,
        updateProduct,
        clearCart,
        removeUnsettedProducts,
        isLoading,
        totalPrice: data?.totalPrice,
        totalItems: data?.totalItems,
        getCartItemsForCheckout,
        checkout
    }
}