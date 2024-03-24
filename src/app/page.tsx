import {currentUser} from "@/lib/auth";
import {Navbar} from "@/components/navbar/navbar";
import ProductList from "@/app/_components/products-list";
import {Separator} from "@/components/ui/separator";
import Filters from "@/app/_components/filters";
import SearchSection from "@/app/_components/search-section";


export default async function Home() {
    const user = await currentUser()
    return (

        <>
            <Navbar/>
            <div className="flex p-4" style={{height: "calc(100vh - 4rem)"}}>
                <div className="flex-auto">
                    <SearchSection/>
                    <ProductList/>
                </div>

                <Separator orientation={"vertical"} className="h-auto"/>
                <Filters/>
            </div>

        </>

    )
}
