// src/models/waitlistModel.ts
import { db } from "../db"; // your Drizzle DB instance
import { eq } from "drizzle-orm";
import { waitlistTable } from "../db/schema";

// Create a waitlist entry
export const createWaitlistEntry = async (email: string, name?: string) => {
  const [entry] = await db
    .insert(waitlistTable)
    .values({ email, name })
    .returning(); // returns all columns
  return entry;
};

// Find waitlist entry by email
export const findWaitlistByEmail = async (email: string) => {
  const [entry] = await db
    .select()
    .from(waitlistTable)
    .where(eq(waitlistTable.email, email));
  return entry || null;
};

// Get all waitlist entries
export const getAllWaitlist = async () => {
  return db.select().from(waitlistTable);
};
