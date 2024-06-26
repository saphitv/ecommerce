import {currentUser} from "@/lib/auth";
import {Navbar} from "@/components/navbar/navbar";
import ProductList from "@/app/_components/products-list";
import {Separator} from "@/components/ui/separator";
import Filters from "@/app/_components/filters";
import SearchSection from "@/app/_components/search-section";
import {redirect} from "next/navigation";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";


export default async function Home() {
    const user = await currentUser()

    if(!user) {
        redirect("/login")
    }

    return (

        <>
            <Navbar/>
            <div className="flex p-4" style={{height: "calc(100vh - 4rem)"}}>
                <div className="flex-auto">
                    <SearchSection/>
                    <ProductList/>
                </div>

                <Separator orientation={"vertical"} className="h-auto"/>

                <div className=''>

                    <div className='absolute bg-gray-50 w-full h-full'></div>
                    <div className='absolute w-full h-full z-50 cursor-not-allowed'></div>
                    <Filters/>
                </div>

            </div>

        </>

    )
}
