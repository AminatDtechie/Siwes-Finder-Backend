import { NextFunction, Request, Response } from "express";
import {
    findRecruiterByEmailModel,
} from "../models/recruiterModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findStudentByEmailModel } from "../models/studentModel";

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
        let user: any = null;
        let role: "Student" | "Recruiter" | null = null;

        // Check recruiters table
        const recruiter = await findRecruiterByEmailModel(email);
        if (recruiter) {
            user = recruiter;
            role = "Recruiter";
        }

        // If not recruiter, check students table
        if (!user) {
            const student = await findStudentByEmailModel(email);
            if (student) {
                user = student;
                role = "Student";
            }
        }

        // If not found in either table
        if (!user) {
            return res.status(404).json({ message: "Account not found" });
        }

        // Compare password
        const isValid = bcrypt.compareSync(password, user.password);
        if (!isValid) {
            return res.status(400).json({ message: "Email or password incorrect" });
        }

        // Remove sensitive data
        const { password: pass, ...safeUser } = user;

        // Sign JWT with role
        const token = jwt.sign(
            { ...safeUser, role },
            process.env.ACCESS_TOKEN!,
            { expiresIn: "24h" }
        );

        return res.status(200).json({
            message: "Login successful",
            token,
            role,
        });
    } catch (error) {
        next(error);
    }
};
