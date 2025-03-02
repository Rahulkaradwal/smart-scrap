import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

const sql = neon(process.env.DATABASE_URL);
f;

export const db = drizzle(sql, { schema });
