import { currentRole } from "@/lib/auth";
import { NextResponse } from "next/server";
import {UserRoleEnum} from "@/lib/db/schemas/auth";

export async function GET() {
    const role = await currentRole();

    if (role === UserRoleEnum.ADMIN) {
        return new NextResponse(null, { status: 200 });
    }

    return new NextResponse(null, { status: 403 });
}