import { eq } from "drizzle-orm";
import { db } from "../db";
import { recruitersTable } from "../db/schema";

// for signup
export const createRecruiterModel = async ({
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
  const newRecruiter = await db
    .insert(recruitersTable)
    .values({ firstname, lastname, email, password })
    .returning();

  return newRecruiter;
};

// finding recruiter by email
export const findRecruiterByEmailModel = async (email: string) => {
  const recruiter = await db
    .select()
    .from(recruitersTable)
    .where(eq(recruitersTable.email, email))
    .limit(1);

  return recruiter[0];
};

//find recruiter by id
export const findRecruiterByIdModel = async (id: string) => {
  const recruiter = await db
    .select()
    .from(recruitersTable)
    .where(eq(recruitersTable.id, id))
    .limit(1);
  return recruiter[0];
};

// updating recruiter
export const updateRecruiterModel = async ({
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
  const recruiter = await db
    .update(recruitersTable)
    .set({ firstname, lastname, email, password })
    .where(eq(recruitersTable.id, id))
    .returning();
  return recruiter[0];
};

// deleting recruiter
export const deleteRecruiterModel = async (id: string) => {
  const recruiter = await db
    .delete(recruitersTable)
    .where(eq(recruitersTable.id, id))
    .returning();
  return recruiter;
};

export const fetchRecruitersModel = async () => {
  const recruiters = await db.select().from(recruitersTable);
  return recruiters;
};
