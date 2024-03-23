"use client"
import {SearchProductBar} from "@/app/_components/search-product-bar";

export default function SearchSection(){
    return (
        <div className="flex items-center justify-center w-full h-fit sticky top-10 bg-transparent z-20 drop-shadow-lg">
            <SearchProductBar/>
        </div>
    )
}


