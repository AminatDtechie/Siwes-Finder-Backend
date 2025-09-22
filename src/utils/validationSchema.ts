import { z } from "zod";

const positionTypeEnum = z.enum(["onsite", "remote", "hybrid"], "Invalid type");
const salaryTypeEnum = z.enum(["paid", "unpaid"], "Invalid type");

export const studentRegisterSchema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, "Password must be at least 6 characters"),
}).strict();

export const recruiterRegisterSchema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const createPlacementSchema = z.object({
  industry: z.string().min(1, "Industry is required"),
  position_title: z.string().min(1, "Position title is required"),
  location: z.string().min(1, "Location is required"),
  duration: z.string().min(1, "Duration is required"),
  description: z.string().min(1, "Description is required"),
  position_type: positionTypeEnum,
  salary_type: salaryTypeEnum,
  salary_amount: z.string().optional(), // can be empty string or omitted if unpaid
  recruiter_id: z.string().uuid("Invalid recruiter ID"),
});

export const placementQuerySchema = z.object({
  location: z.string().optional(),
  position_type: positionTypeEnum.optional(),
  salary_type: salaryTypeEnum.optional(), 
  duration: z.string().optional(),
  limit: z.coerce.number().int().positive().optional(),
  offset: z.coerce.number().int().nonnegative().optional(),
});
