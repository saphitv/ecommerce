"use client";


import {useCurrentRole} from "@/hooks/use-current-role";
import {FormError} from "@/components/form-error";
import {UserRole} from "@/lib/db/schemas/auth";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {LockIcon} from "lucide-react";

interface RoleGateProps {
    children: React.ReactNode;
    allowedRole: UserRole;
}

export const RoleGate = ({
                             children,
                             allowedRole,
                         }: RoleGateProps) => {
    const role = useCurrentRole();

    if (role !== allowedRole) {
        return (
            <>
                <NoPermission/>
                <Button>
                    <Link href={'/settings'}>Go back</Link>
                </Button>
            </>

        )
    }

    return (
        <>
            {children}
        </>
    );
};

function NoPermission() {
    return (
        <div className="flex h-[100dvh] w-full flex-col items-center justify-center bg-gray-100 px-4 dark:bg-gray-900">
            <div className="mx-auto max-w-md space-y-4 text-center">
                <LockIcon className="mx-auto h-16 w-16 text-gray-500 dark:text-gray-400"/>
                <h1 className="text-3xl font-bold tracking-tighter text-gray-900 dark:text-gray-50">Access Denied</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    You do not have permission to view this content. Please contact the site administrator if you
                    believe this is an error. (Demo purposes only: click the button below to navigate to the settings
                    page, and then change your role to admin)
                </p>
                <div className="flex flex-row gap-2 sm:flex-row">
                    <Link href={'/'} className='w-full'>
                        <Button variant="outline" className='w-full'>
                            Go Back
                        </Button>
                    </Link>
                    <Link href={'/settings'} className='w-full'>
                        <Button className='w-full'>
                            Get Access
                        </Button>
                    </Link>


                </div>
            </div>
        </div>
    )
}