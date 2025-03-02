import {
  integer,
  pgTable,
  varchar,
  timestamp,
  serial,
  text,
  boolean,
  jsonb,
} from "drizzle-orm/pg-core";
// Users table
export const Users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 256 }).notNull().unique(),
  name: varchar("name", { length: 256 }).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
});
// Reports table
export const Reports = pgTable("reports", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => Users.id)
    .notNull(),
  location: text("location").notNull(),
  wasteType: varchar("waste_type", { length: 256 }).notNull(),
  imageUrl: text("image_url"),
  verificationResult: jsonb("verification_result"),
  status: varchar("status", { length: 256 }).notNull().default("pending"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
});
// Rewards table
export const Rewards = pgTable("rewards", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => Users.id)
    .notNull(),
  points: integer("points").notNull().default(0),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  isAvailable: boolean("is_available").notNull().default(true),
  description: text("description"),
  name: varchar("name", { length: 256 }).notNull(),
  collectionInfo: text("collection_info").notNull(),
});

// CollectedWastes table
export const CollectedWastes = pgTable("collected_wastes", {
  id: serial("id").primaryKey(),
  reportId: integer("report_id")
    .references(() => Reports.id)
    .notNull(),
  collectorId: integer("collector_id")
    .references(() => Users.id)
    .notNull(),
  collectionDate: timestamp("collection_date").notNull(),
  status: varchar("status", { length: 20 }).notNull().default("collected"),
});

// Notifications table
export const Notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => Users.id)
    .notNull(),
  message: text("message").notNull(),
  type: varchar("type", { length: 50 }).notNull(),
  isRead: boolean("is_read").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// New Transactions table
export const Transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => Users.id)
    .notNull(),
  type: varchar("type", { length: 20 }).notNull(), // 'earned' or 'redeemed'
  amount: integer("amount").notNull(),
  description: text("description").notNull(),
  date: timestamp("date").defaultNow().notNull(),
});
