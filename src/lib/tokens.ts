import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

import { db } from "@/lib/db";
import {getVerificationTokenByEmail, getVerificationTokenByToken} from "@/lib/db/data/verification-token";
import { getPasswordResetTokenByEmail } from "@/lib/db/data/password-reset-token";
import {getTwoFactorTokenByEmail, getTwoFactorTokenByToken} from "@/lib/db/data/two-factor-token";
import {passwordResetTokens, twoFactorTokens, verificationTokens} from "@/lib/db/schemas/auth";
import {eq} from "drizzle-orm";
import {currentUser} from "@/lib/auth";

export const generateTwoFactorToken = async (email: string) => {
    const token = crypto.randomInt(100_000, 1_000_000).toString();
    const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

    const existingToken = await getTwoFactorTokenByEmail(email);

    if (existingToken) {
        await db.delete(twoFactorTokens)
            .where(eq(twoFactorTokens.id, existingToken.id));
    }

    await db.insert(twoFactorTokens).values({
        email,
        token,
        expires,
    }).execute();

    return (await getTwoFactorTokenByToken(token))!;
}

export const generatePasswordResetToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getPasswordResetTokenByEmail(email);

    if (existingToken) {
        await db.delete(passwordResetTokens).where(eq(passwordResetTokens.id, existingToken.id));
    }

    await db.insert(passwordResetTokens).values({
        email,
        token,
        expires,
    }).execute();

    return (await getVerificationTokenByToken(token))!;
}

export const generateVerificationToken = async (email: string) => {
    const user = await currentUser()


    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
        await db.delete(verificationTokens).where(eq(verificationTokens.id, existingToken.id));
    }

    await db.insert(verificationTokens).values({
        email,
        userId: user?.id,
        token,
        expires,
    }).execute();


    return (await getVerificationTokenByToken(token))!;
};