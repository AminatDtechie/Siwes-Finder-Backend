import {
  integer,
  pgTable,
  varchar,
  pgEnum,
  text,
  uuid,
  serial,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { timestamps } from "./column.helpers";

export const statusEnum = pgEnum("role", ["Active", "Inactive", "Deleted"]);
export const positionTypeEnum = pgEnum("position_type_enum", [
  "onsite",
  "remote",
  "hybrid",
]);
export const salaryTypeEnum = pgEnum("salary_type_enum", ["paid", "unpaid"]);
export const authProviderEnum = pgEnum("auth_provider", ["email", "google"]);
// students table
export const studentsTable = pgTable("students", {
  id: uuid().primaryKey().defaultRandom(),
  firstname: varchar({ length: 255 }).notNull(),
  lastname: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }), // nullable for google users
  google_id: varchar({ length: 255 }).unique(),
  auth_provider: authProviderEnum("auth_provider").notNull().default("email"),
  status: statusEnum("status").notNull().default("Inactive"),
  ...timestamps(),
});

// recruiters table
export const recruitersTable = pgTable("recruiters", {
  id: uuid("id").primaryKey().defaultRandom(),
  firstname: varchar("firstname", { length: 255 }).notNull(),
  lastname: varchar("lastname", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }), // nullable for google users
  google_id: varchar("google_id", { length: 255 }).unique(),
  auth_provider: authProviderEnum("auth_provider").notNull().default("email"),
  status: statusEnum("status").notNull().default("Inactive"),
  isVerified: boolean("is_verified").notNull().default(false),
  ...timestamps(),
});


// placements table
export const placementsTable = pgTable("placements", {
  id: uuid("id").primaryKey().defaultRandom(),
  industry: varchar("industry", { length: 255 }).notNull(),
  position_title: varchar("position_title", { length: 255 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  duration: varchar("duration", { length: 100 }).notNull(),
  description: text("description").notNull(),
  position_type: positionTypeEnum("position_type").notNull(),
  salary_type: salaryTypeEnum("salary_type").notNull(),
  salary_amount: varchar("salary_amount", { length: 100 })
    .default("")
    .notNull(),
  recruiter_id: uuid("recruiter_id")
    .notNull()
    .references(() => recruitersTable.id),
  ...timestamps(),
});

// waitlist table
export const waitlistTable = pgTable("waitlist", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).default(""), // optional
  ...timestamps(),
});
