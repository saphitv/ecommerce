"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/db/data/user";
import { getVerificationTokenByToken } from "@/lib/db/data/verification-token";
import {users, verificationTokens} from "@/lib/db/schemas/auth";
import {eq} from "drizzle-orm";

export const newVerification = async (token: string) => {
    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
        return { error: "Token does not exist!" };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return { error: "Token has expired!" };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return { error: "Email does not exist!" };
    }

    await db.update(users)
        .set({
            emailVerified: new Date(),
            email: existingToken.email
        })
        .where(eq(users.id, existingUser.id))


    await db.delete(verificationTokens)
        .where(eq(verificationTokens.id, existingToken.id))


    return { success: "Email verified!" };
};