import { drizzle as drizzlePlanetscale } from "drizzle-orm/planetscale-serverless";
import { Client } from "@planetscale/database";
import * as productSchema from "./schemas/products";
import * as authSchema from "./schemas/auth";

/* pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT!,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
}); */

const schema = {
  ...productSchema,
  ...authSchema,
};

const pool = new Client({
  url: process.env.DATABASE_URL,
}).connection();

declare global {
  var db: ReturnType<typeof drizzlePlanetscale<typeof schema>> | undefined;
}

// const db = globalThis.db || drizzleMysql(pool);
const db = globalThis.db || drizzlePlanetscale(pool, { schema: schema });

export { db };
