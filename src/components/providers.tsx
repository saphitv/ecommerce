"use client"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactNode} from "react";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

export default function Providers({children}: {children: ReactNode}){
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: 2,
                retryDelay: 1000
            }
        }
    })
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={true} position={'bottom'}/>
        </QueryClientProvider>
    )
}