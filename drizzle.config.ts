import { type Config } from "drizzle-kit";


export default {
    schema: "./src/lib/db/schemas/*",
    out: "./src/lib/db/migrations",
    driver: "mysql2",
    dbCredentials: {
        //uri: process.env.LOCAL_DATABASE_URL,
        uri: process.env.DATABASE_URL_DEV!,
    },
    tablesFilter: [process.env.DB_PREFIX + "*"],
}   satisfies Config;