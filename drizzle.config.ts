import { type Config } from "drizzle-kit";


export default {
    schema: "./src/lib/db/schemas/*",
    out: "./src/lib/db/migrations",
    driver: "mysql2",
    dbCredentials: {
        uri: "mysql://root:@localhost:3306/next-auth",
    },
}   satisfies Config;