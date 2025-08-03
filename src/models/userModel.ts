import { eq } from "drizzle-orm";
import { db } from "../db";
import { usersTable } from "../db/schema";

// for signup
export const createUserModel = async ({
  firstname,
  lastname,
  age,
  email,
  password,
}: {
  firstname: string;
  lastname: string;
  age: number;
  email: string;
  password: string;
}) => {
  const newUser = await db
    .insert(usersTable)
    .values({ firstname, lastname, age, email, password })
    .returning();

  return newUser;
};

// finding user by email
export const findUserByEmailModel = async (email: string) => {
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  return user[0];
};

//find user by id
export const findUserByIdModel = async (id: number) => {
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, id))
    .limit(1);
  return user[0];
};

// updating user
export const updateUserModel = async ({
  id,
  firstname,
  lastname,
  age,
  email,
  password,
}: {
  id: number;
  firstname?: string;
  lastname?: string;
  age?: number;
  email?: string;
  password?: string;
}) => {
  const user = await db
    .update(usersTable)
    .set({ firstname, lastname, age, email, password })
    .where(eq(usersTable.id, id))
    .returning();
  return user[0];
};

// deleting user
export const deleteUserModel = async (id: number) => {
  const user = await db
    .delete(usersTable)
    .where(eq(usersTable.id, id))
    .returning();
  return user;
};
