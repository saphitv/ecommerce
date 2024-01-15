import { db } from "@/lib/db";
import {twoFactorTokens} from "@/lib/db/schemas/auth";
import {eq} from "drizzle-orm";

export const getTwoFactorTokenByToken = async (token: string) => {
    try {
        return (await db
                .select()
                .from(twoFactorTokens)
                .where(eq(twoFactorTokens.token, token))
                .limit(1)
        )[0]
    } catch {
        return null;
    }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
    try {
        return (await db
                .select()
                .from(twoFactorTokens)
                .where(eq(twoFactorTokens.email, email))
                .limit(1)
        )[0]
    } catch {
        return null;
    }
};