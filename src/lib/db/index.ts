import {drizzle as drizzleMysql} from 'drizzle-orm/mysql2';
import {drizzle as drizzlePlanetscale} from 'drizzle-orm/planetscale-serverless';
import { Client } from "@planetscale/database";
import mysql from 'mysql2/promise';

/* pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT!,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
}); */


const pool = new Client({
    url: process.env.DATABASE_URL,
}).connection()





declare global {
    var db: ReturnType<typeof drizzlePlanetscale> | undefined;
}


// const db = globalThis.db || drizzleMysql(pool);
const db = globalThis.db || drizzlePlanetscale(pool);

if (process.env.NODE_ENV !== "development") globalThis.db = db;

export {db}