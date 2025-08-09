import { eq } from "drizzle-orm";
import { db } from "../db";
import { studentsTable } from "../db/schema";

// for signup
export const createStudentModel = async ({
  firstname,
  lastname,
  email,
  password,
}: {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}) => {
  const newStudent = await db
    .insert(studentsTable)
    .values({ firstname, lastname, email, password })
    .returning();

  return newStudent;
};

// finding student by email
export const findStudentByEmailModel = async (email: string) => {
  const student = await db
    .select()
    .from(studentsTable)
    .where(eq(studentsTable.email, email))
    .limit(1);

  return student[0];
};

//find student by id
export const findStudentByIdModel = async (id: string) => {
  const student = await db
    .select()
    .from(studentsTable)
    .where(eq(studentsTable.id, id))
    .limit(1);
  return student[0];
};

// updating student
export const updateStudentModel = async ({
  id,
  firstname,
  lastname,
  age,
  email,
  password,
}: {
  id: string;
  firstname?: string;
  lastname?: string;
  age?: number;
  email?: string;
  password?: string;
}) => {
  const student = await db
    .update(studentsTable)
    .set({ firstname, lastname, email, password })
    .where(eq(studentsTable.id, id))
    .returning();
  return student[0];
};

// deleting student
export const deleteStudentModel = async (id: string) => {
  const student = await db
    .delete(studentsTable)
    .where(eq(studentsTable.id, id))
    .returning();
  return student;
};
