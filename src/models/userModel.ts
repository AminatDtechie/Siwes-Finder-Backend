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

export const findUserByEmailModel = async (email: string) => {
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

    return user;
};


