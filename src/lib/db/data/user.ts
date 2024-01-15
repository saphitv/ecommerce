import {db} from "@/lib/db";
import {users} from "@/lib/db/schemas/auth";
import {eq} from "drizzle-orm";

export const getUserByEmail = async (email: string) => {
    try {
        return (await db.select().from(users).where(eq(users.email, email)).limit(1))[0];
    } catch {
        return null;
    }
};

export const getUserById = async (id: string) => {
    try {
        return (await db.select().from(users).where(eq(users.id, id)).limit(1))[0]
    } catch {
        return null;
    }
};