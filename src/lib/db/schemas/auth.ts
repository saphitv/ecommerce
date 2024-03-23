import type {AdapterAccount} from "@auth/core/adapters"
import {integer, primaryKey, sqliteTableCreator, text, uniqueIndex} from "drizzle-orm/sqlite-core";
import {sql} from "drizzle-orm";

export type UserRole = "USER" | "ADMIN"

export enum UserRoleEnum {
    USER = "USER",
    ADMIN = "ADMIN",
}

export const sqliteTable = sqliteTableCreator((name) => `${process.env.DB_PREFIX}${name}`);

export const users = sqliteTable("user", {
    id: text("id", {length: 255}).notNull().primaryKey(),
    name: text("name", {length: 255}),
    email: text("email", {length: 255}).notNull().unique(),
    emailVerified: integer("emailVerified", {mode: "timestamp"}).default(sql`(CURRENT_TIMESTAMP)`),
    image: text("image", {length: 255}),
    password: text("password", {length: 255}),
    role: text("role", {enum: ["USER", "ADMIN"]}).default("USER"),
    isTwoFactorEnabled: integer("isTwoFactorEnabled", {mode: "boolean"}).default(false),

})

export const accounts = sqliteTable(
    "account",
    {
        userId: text("userId", {length: 255})
            .notNull()
            .references(() => users.id, {onDelete: "cascade"}),
        type: text("type", {length: 255}).$type<AdapterAccount["type"]>().notNull(),
        provider: text("provider", {length: 255}).notNull(),
        providerAccountId: text("providerAccountId", {length: 255}).notNull(),
        refresh_token: text("refresh_token", {length: 255}),
        access_token: text("access_token", {length: 255}),
        expires_at: integer("expires_at"),
        token_type: text("token_type", {length: 255}),
        scope: text("scope", {length: 255}),
        id_token: text("id_token", {length: 2048}),
        session_state: text("session_state", {length: 255}),
    },
    (account) => ({
        pk: primaryKey({
            columns: [account.provider, account.providerAccountId],
        }),
    })
)

export const sessions = sqliteTable("session", {
    sessionToken: text("sessionToken", {length: 255}).notNull().primaryKey(),
    userId: text("userId", {length: 255})
        .notNull()
        .references(() => users.id, {onDelete: "cascade"}),
    expires: integer("expires", {mode: "timestamp"}).notNull(),
})

export const verificationTokens = sqliteTable(
    "verificationToken",
    {
        id: integer("id").primaryKey({autoIncrement: true}),
        email: text("email", {length: 255}).notNull(),
        userId: text("userId", {length: 255}).references(() => users.id, {onDelete: "cascade"}),
        token: text("token", {length: 255}).notNull(),
        expires: integer("expires", {mode: "timestamp"}).notNull(),
    },
    (table) => ({
        ui_token: uniqueIndex('token').on(table.token),
        ui_email_user: uniqueIndex('email_user').on(table.email, table.userId),
    })
)

export const passwordResetTokens = sqliteTable(
    "passwordResetToken",
    {
        id: integer("id").primaryKey({autoIncrement: true}),
        email: text("email", {length: 255}).notNull(),
        token: text("token", {length: 255}).notNull(),
        expires: integer("expires", {mode: "timestamp"}).notNull(),
    },
    (table) => ({
        unique: uniqueIndex('UQ_passwordResetToken_emailToken').on(table.email, table.token),
    })
)

export const twoFactorTokens = sqliteTable(
    "twoFactorToken",
    {
        id: integer("id").primaryKey({autoIncrement: true}),
        email: text("email", {length: 255}).notNull(),
        token: text("token", {length: 255}).notNull(),
        expires: integer("expires", {mode: "timestamp"}).notNull(),
    },
    (table) => ({
        compoundKey: uniqueIndex('UQ_twoFactorTokens_emailToken').on(table.email, table.token),
    })
)

export const twoFactorConfirmations = sqliteTable(
    "twoFactorConfirmation",
    {
        id: integer("id").primaryKey({autoIncrement: true}),
        userId: text("userId", {length: 255})
            .notNull()
            .references(() => users.id, {onDelete: "cascade"})
            .unique(),
    },
)




















