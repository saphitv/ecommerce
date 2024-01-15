import { db } from "@/lib/db";
import {passwordResetTokens} from "@/lib/db/schemas/auth";
import {eq} from "drizzle-orm";

export const getPasswordResetTokenByToken = async (token: string) => {
    try {
        return (await db
            .select()
            .from(passwordResetTokens)
            .where(eq(passwordResetTokens.token, token))
            .limit(1)
        )[0]
    } catch {
        return null;
    }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
    try {
        return (await db
                .select()
                .from(passwordResetTokens)
                .where(eq(passwordResetTokens.email, email))
                .limit(1)
        )[0]
    } catch {
        return null;
    }
};