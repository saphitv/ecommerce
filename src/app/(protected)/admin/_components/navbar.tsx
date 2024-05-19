"use client"
import * as icons from "@radix-ui/react-icons";
import {usePathname, useRouter} from "next/navigation";
import {cn} from "@/lib/utils";
import {UserButton} from "@/components/auth/user-button";
import {ShoppingCart, UserIcon} from "lucide-react";

export default function NavBar(){
    const pathname = usePathname()
    const router = useRouter()

    const pages = [
        { name: 'Public section', href: '/', icon: UserIcon },
        /* { name: 'Dashboard', href: '/admin', icon: icons.HomeIcon }, */
        { name: 'Products', href: '/admin/product', icon: icons.FileTextIcon },
        { name: 'Add Product', href: '/admin/product/add', icon: icons.PlusIcon },
    ]

    return (
        <nav className="flex flex-col justify-between h-full gap-1 min-w-[240px] pt-4 p-2 font-sans text-base font-normal text-gray-700">
            <div>
                {pages.map((item) => (
                    <div key={item.name} role="button"
                         className={cn(
                             pathname == item.href ?
                                 "bg-blue-50 bg-opacity-80 text-blue-900" :
                                 "",
                             "flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
                         )}
                         onClick={() => router.push(item.href)}
                    >
                        <div className="grid place-items-center mr-4">
                            <item.icon className="h-5 w-5"/>
                        </div>
                        {item.name}
                    </div>
                ))}
            </div>
            <div><UserButton/></div>
        </nav>
    )
}