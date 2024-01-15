"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas/auth";
import { getUserByEmail } from "@/lib/db/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import {users} from "@/lib/db/schemas/auth";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return { error: "Email already in use!" };
    }

    await db.insert(users).values({
        id: uuidv4(),
        name: name,
        email,
        password: hashedPassword,
    })

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token,
    );

    return { success: "Confirmation email sent!" };
};