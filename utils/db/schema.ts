import {
  integer,
  pgTable,
  varchar,
  timestamp,
  serial,
  text,
  json,
  boolean,
} from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 256 }).notNull().unique(),
  name: varchar("name", { length: 256 }).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
});
