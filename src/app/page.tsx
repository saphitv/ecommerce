import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

import { Poppins} from "next/font/google";
import {LoginButton} from "@/components/auth/login-button";
import {currentUser} from "@/lib/auth";
import { Navbar } from "@/app/_components/navbar";
import ProductList from "@/app/_components/products-list";
import {Separator} from "@/components/ui/separator";
import Filters from "@/app/_components/filters";
import SearchSection from "@/app/_components/search-section";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"]
})

export default async function Home() {
    const user = await currentUser()

    return (
        <>
        {!user && (
            <main
                className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
                <div className="space-y-6 text-center">
                    <h1 className={cn(
                        "text-6xl font-semibold text-white drop-shadow-md",
                        font.className,
                    )}>
                        🔐Auth
                    </h1>
                    <p className="text-white text-lg">
                        A simple authentication service
                    </p>
                    <div>
                        <LoginButton asChild mode={"redirect"}>
                            <Button variant="secondary" size="lg">
                                Sign in
                            </Button>
                        </LoginButton>
                    </div>
                </div>
            </main>
        )}

        {user && (
            <>
                <Navbar/>
                <div className="flex p-4">
                    <div className="flex-auto">
                        <SearchSection/>
                        <ProductList/>
                    </div>

                    <Separator orientation={"vertical"} className="h-auto"/>
                    <Filters/>
                </div>

            </>

        )}
        </>
    )
}
