"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import {update} from "@/auth";
import {db} from "@/lib/db";
import {SettingsSchema} from "@/schemas/auth";
import {getUserByEmail, getUserById} from "@/lib/db/data/user";
import {currentUser} from "@/lib/auth";
import {generateVerificationToken} from "@/lib/tokens";
import {sendVerificationEmail} from "@/lib/mail";
import {users} from "@/lib/db/schemas/auth";
import {eq} from "drizzle-orm";

export const settings = async (
    values: z.infer<typeof SettingsSchema>
) => {
    const user = await currentUser();

    if (!user) {
        return { error: "Unauthorized" }
    }

    const dbUser = await getUserById(user.id);

    if (!dbUser) {
        return { error: "Unauthorized" }
    }

    if (user.isOAuth) {
        values.email = undefined;
        values.password = undefined;
        values.newPassword = undefined;
        values.isTwoFactorEnabled = undefined;
    }

    if (values.email && values.email !== user.email) {
        const existingUser = await getUserByEmail(values.email);

        if (existingUser && existingUser.id !== user.id) {
            return { error: "Email already in use!" }
        }

        const verificationToken = await generateVerificationToken(
            values.email
        );
        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token,
        );

        return { success: "Verification email sent!" };
    }

    if (values.password && values.newPassword && dbUser.password) {
        const passwordsMatch = await bcrypt.compare(
            values.password,
            dbUser.password,
        );

        if (!passwordsMatch) {
            return { error: "Incorrect password!" };
        }

        values.password = await bcrypt.hash(
            values.newPassword,
            10,
        );
        values.newPassword = undefined;
    }




    /* before {...values} */

    await db.update(users)
        .set({
            name: values.name,
            email: values.email,
            isTwoFactorEnabled: values.isTwoFactorEnabled ? 1 : 0,
            role: values.role,
            password: values.password,
        })
        .where(eq(users.id, dbUser.id))

    const updatedUser = (await getUserById(dbUser.id))!

    update({
        user: {
            name: updatedUser.name,
            email: updatedUser.email,
            isTwoFactorEnabled: updatedUser.isTwoFactorEnabled ? true : false,
            role: updatedUser.role ?? undefined,
        }
    });

    return { success: "Settings Updated!" }
}