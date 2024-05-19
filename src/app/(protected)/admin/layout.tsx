import * as icons from "@radix-ui/react-icons";
import NavBar from "@/app/(protected)/admin/_components/navbar";
import {RoleGate} from "@/components/auth/role-gate";


export default function Example({children}: {children: React.ReactNode}) {

    return (
        <>
            <RoleGate allowedRole={'ADMIN'}>
                <div className='flex'>
                    {/* Sidebar */}
                    <div
                        className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
                        <div className="mb-2 p-4">
                            <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">
                                🛍️ Admin section
                            </h5>
                        </div>
                        <hr/>
                        <NavBar/>
                    </div>
                    {children}
                </div>
            </RoleGate>
        </>
    )
}
