"use server";

import { currentRole } from "@/lib/auth";
import {UserRoleEnum} from "@/lib/db/schemas/auth";

export const admin = async () => {
    const role = await currentRole();

    if (role === UserRoleEnum.ADMIN) {
        return { success: "Allowed Server Action!" };
    }

    return { error: "Forbidden Server Action!" }
};