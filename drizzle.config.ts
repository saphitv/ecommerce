import {type Config} from "drizzle-kit";

export default {
  schema: "./src/lib/db/schemas/*",
  out: "./src/lib/db/migrations",
  driver: "turso",
  dbCredentials: {
    url: 'http://127.0.0.1:8080',
    // url: process.env.TURSO_CONNECTION_URL!,
    // authToken: process.env.TURSO_AUTH_TOKEN!,
  },
  tablesFilter: [process.env.DB_PREFIX + "*"],
} satisfies Config;
