import {drizzle} from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    database: "next-auth",
    password: ""
});

declare global {
    var db: ReturnType<typeof drizzle> | undefined;
}


const db = globalThis.db || drizzle(pool);

if (process.env.NODE_ENV !== "development") globalThis.db = db;

export {db}