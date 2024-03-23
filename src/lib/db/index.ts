import { drizzle } from "drizzle-orm/libsql";
import * as productSchema from "./schemas/products";
import * as authSchema from "./schemas/auth";
import { createClient } from "@libsql/client";

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

const client = createClient({
  url: 'http://127.0.0.1:8080',
  //url: process.env.TURSO_CONNECTION_URL!,
  //authToken: process.env.TURSO_AUTH_TOKEN!,
})

export const db = drizzle(client, { schema: schema })
