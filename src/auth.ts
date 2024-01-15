import NextAuth from "next-auth"

import { db } from "@/lib/db";
import authConfig from "@/auth.config";
import { getUserById } from "@/lib/db/data/user";
import { getTwoFactorConfirmationByUserId } from "@/lib/db/data/two-factor-confirmation";
import { getAccountByUserId } from "@/lib/db/data/account";
import {DrizzleAdapter} from "@auth/drizzle-adapter";
import {twoFactorConfirmations, type UserRole, users} from "@/lib/db/schemas/auth";
import {eq} from "drizzle-orm";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
    update,
} = NextAuth({
    pages: {
        signIn: "/login",
        error: "/error",
    },
    events: {
        async linkAccount({ user }) {
            await db.update(users)
                .set({ emailVerified: new Date() })
                .where(eq(users.id, user.id))
        }
    },
    callbacks: {
        async signIn({ user, account }) {
            // Allow OAuth without email verification
            if (account?.provider !== "credentials") return true;

            const existingUser = await getUserById(user.id);

            // Prevent sign in without email verification
            if (!existingUser?.emailVerified) return false;

            if (existingUser.isTwoFactorEnabled) {
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

                if (!twoFactorConfirmation) return false;

                // Delete 2FA confirmation for next signing
                await db.delete(twoFactorConfirmations)
                    .where(eq(twoFactorConfirmations.id, twoFactorConfirmation.id));
            }

            return true;
        },
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                session.user.role = token.role as UserRole;
            }

            if (session.user) {
                session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
            }

            if (session.user) {
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.isOAuth = token.isOAuth as boolean;
            }

            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if (!existingUser) return token;

            const existingAccount = await getAccountByUserId(
                existingUser.id
            );

            token.isOAuth = !!existingAccount?.userId;
            token.name = existingUser.name;
            token.email = existingUser.email;
            token.role = existingUser.role;
            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

            return token;
        }
    },
    adapter: DrizzleAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
});