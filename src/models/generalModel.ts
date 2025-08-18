import { eq } from "drizzle-orm";
import { db } from "../db";
import { studentsTable } from "../db/schema";
import { recruitersTable } from "../db/schema";

export const activateUser = async ( id: string, role: "Student" | "Recruiter" ) => {

  const table = role === "Student" ? studentsTable : recruitersTable;
  
  const student = await db
  .update(table)
  .set({ status: "Active" })
  .where(eq(table.id, id))
  .returning();

  return student[0];
}