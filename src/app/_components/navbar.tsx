import Image from "next/image";
import {Icon} from "@radix-ui/react-select";
import {BellIcon, MagnifyingGlassIcon} from "@radix-ui/react-icons";
import {Navigationmenu} from "@/app/_components/navigation-menu";
import {Separator} from "@/components/ui/separator";
import {UserButton} from "@/components/auth/user-button";
import {Input} from "@/components/ui/input";

export function Navbar() {
    return (
        <>
        <div className="bg-white shadow">
            <div className="px-2 sm:px-4">
                <div className="flex h-16 justify-between items-center">
                    <div className="flex px-2 items-center">
                        <div className="flex flex-shrink-0 items-center text-xl aspect-square mr-2">
                            <span className="hover:bg-slate-200 p-2 rounded font-semibold flex flex-row text-center cursor-pointer">
                                🛍<span className="text-lg ml-2">Ecommerce</span>
                            </span>
                        </div>
                        <Separator orientation={'vertical'} className="min-h-8 mr-2"/>
                        <div>
                            <Navigationmenu/>
                        </div>

                    </div>


                    <div className="flex items-center justify-center space-x-2 px-4">
                        <form>
                            <div className="w-full max-w-lg lg:max-w-xs">
                                <div className="relative">
                                    <div
                                        className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <MagnifyingGlassIcon/>
                                    </div>
                                    <Input className="focus:w-64 transition-all duration-200 ease-in-out min-w-20
                                           block rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                           placeholder="Search" type="search"/>
                                </div>
                            </div>
                        </form>

                        <div className="flex justify-center">

                            <UserButton withoutText={true}/>
                        </div>
                    </div>


                </div>
            </div>


        </div>
        </>
    )
}


