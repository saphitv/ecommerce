import { db } from "@/lib/db";
import {accounts} from "@/lib/db/schemas/auth";
import {eq} from "drizzle-orm";

export const getAccountByUserId = async (userId: string) => {
    try {
        return (await db.select().from(accounts).where(eq(accounts.userId, userId)).limit(1))[0];
    } catch {
        return null;
    }
};