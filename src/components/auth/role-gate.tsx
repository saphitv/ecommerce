"use client";


import { useCurrentRole } from "@/hooks/use-current-role";
import { FormError } from "@/components/form-error";
import {UserRole} from "@/lib/db/schemas/auth";
import {Button} from "@/components/ui/button";
import Link from "next/link";

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
                <FormError message="You do not have permission to view this content!" />
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