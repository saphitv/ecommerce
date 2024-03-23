"use client"
import {useRouter} from "next/navigation";

export default function NavbarLogo() {
    const router = useRouter()
    return (
        <span onClick={() => router.push('/')}
              className="hover:bg-slate-200 p-2 rounded font-semibold flex flex-row text-center cursor-pointer">

            🛍<span className="text-lg ml-2">Ecommerce</span>

        </span>
    )
}