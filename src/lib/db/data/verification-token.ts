import {db} from "@/lib/db";
import {verificationTokens} from "@/lib/db/schemas/auth";
import {eq} from "drizzle-orm";

export const getVerificationTokenByToken = async (
    token: string
) => {
    try {
        return (await db.select().from(verificationTokens).where(eq(verificationTokens.token, token)).limit(1))[0];
    } catch {
        return null;
    }
}

export const getVerificationTokenByEmail = async (
    email: string
) => {
    try {
        return (await db.select().from(verificationTokens).where(eq(verificationTokens.email, email)).limit(1))[0];
    } catch {
        return null;
    }
}