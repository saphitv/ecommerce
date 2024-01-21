import {
    int,
    timestamp,
    primaryKey,
    varchar, mysqlEnum, uniqueIndex, mysqlTableCreator
} from "drizzle-orm/mysql-core"
import type { AdapterAccount } from "@auth/core/adapters"

export type UserRole = "USER" | "ADMIN"
export enum UserRoleEnum {
    USER = "USER",
    ADMIN = "ADMIN",
}

export const mysqlTable = mysqlTableCreator((name) => `${process.env.DB_PREFIX}${name}`);

export const users = mysqlTable("user", {
    id: varchar("id", { length: 255 }).notNull().primaryKey(),
    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull().unique(),
    emailVerified: timestamp("emailVerified", { mode: "date", fsp: 3 }).defaultNow(),
    image: varchar("image", { length: 255 }),
    password: varchar("password", { length: 255 }),
    role: mysqlEnum("role", ["USER", "ADMIN"]).default("USER"),
    isTwoFactorEnabled: int("isTwoFactorEnabled").default(0),

})

export const accounts = mysqlTable(
    "account",
    {
        userId: varchar("userId", { length: 255 })
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: varchar("type", { length: 255 }).$type<AdapterAccount["type"]>().notNull(),
        provider: varchar("provider", { length: 255 }).notNull(),
        providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
        refresh_token: varchar("refresh_token", { length: 255 }),
        access_token: varchar("access_token", { length: 255 }),
        expires_at: int("expires_at"),
        token_type: varchar("token_type", { length: 255 }),
        scope: varchar("scope", { length: 255 }),
        id_token: varchar("id_token", { length: 2048 }),
        session_state: varchar("session_state", { length: 255 }),
    },
    (account) => ({
        compoundKey: primaryKey({
            columns: [account.provider, account.providerAccountId],
        }),
    })
)

export const sessions = mysqlTable("session", {
    sessionToken: varchar("sessionToken", { length: 255 }).notNull().primaryKey(),
    userId: varchar("userId", { length: 255 })
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const verificationTokens = mysqlTable(
    process.env.DB_PREFIX + "verificationToken",
    {
        id: int("id").primaryKey().autoincrement(),
        email: varchar("email", { length: 255 }).notNull(),
        userId: varchar("userId", { length: 255 }).references(() => users.id, { onDelete: "cascade" }),
        token: varchar("token", { length: 255 }).notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (table) => ({
        ui_token: uniqueIndex('token').on(table.token),
        ui_email_user: uniqueIndex('email_user').on(table.email, table.userId),
    })
)

export const passwordResetTokens = mysqlTable(
    "passwordResetToken",
    {
        id: int("id").primaryKey().autoincrement(),
        email: varchar("email", { length: 255 }).notNull(),
        token: varchar("token", { length: 255 }).notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (table) => ({
        unique: uniqueIndex('email_token').on(table.email, table.token),
        })
)

export const twoFactorTokens = mysqlTable(
    "twoFactorToken",
    {
        id: int("id").primaryKey().autoincrement(),
        email: varchar("email", { length: 255 }).notNull(),
        token: varchar("token", { length: 255 }).notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (table) => ({
        compoundKey: uniqueIndex('email_token').on(table.email, table.token),
    })
)

export const twoFactorConfirmations = mysqlTable(
    "twoFactorConfirmation",
    {
        id: int("id").primaryKey().autoincrement(),
        userId: varchar("userId", { length: 255 })
            .notNull()
            .references(() => users.id, { onDelete: "cascade" })
            .unique(),

    },
)




















