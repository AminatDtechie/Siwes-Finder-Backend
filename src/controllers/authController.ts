import { NextFunction, Request, Response } from "express";
import {
  findRecruiterByEmailModel,
  findRecruiterByIdModel,
} from "../models/recruiterModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  findStudentByEmailModel,
  findStudentByIdModel,
} from "../models/studentModel";
import {
  generateLoginRedirectEmail,
  generateVerificationEmail,
  generateVerificationToken,
  sendEmail,
  verifyVerificationToken,
} from "../utils/email";
import { activateUser } from "../models/generalModel";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    let user: any = null;
    let role: "Student" | "Recruiter" = "Student";

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

    // Check if account is activated
    if (user.status !== "Active") {
      // optionally resend token
      const token = generateVerificationToken(user.id, role);
      const verificationLink = `${process.env.BACKEND_URL}/verify-email?token=${token}`;
      const html = generateVerificationEmail(user.firstname, verificationLink);
      const mail = await sendEmail(
        user.email,
        "Verify your email to log in",
        html
      );

      console.log(mail);
      return res.status(403).json({
        message:
          "Please verify your email. A new verification link has been sent.",
      });
    }

    // Compare password
    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
      return res.status(400).json({ message: "Email or password incorrect" });
    }

    // Remove sensitive data
    const { password: _, ...safeUser } = user;

    // Sign JWT with role
    const token = jwt.sign({ ...safeUser, role }, process.env.ACCESS_TOKEN!, {
      expiresIn: "24h",
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      role,
      data: safeUser,
    });
  } catch (error) {
    next(error);
  }
};
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).send(`
      <div style="text-align:center; padding:50px;">
        <h1>Invalid token</h1>
        <p>The verification link is invalid.</p>
      </div>
    `);
  }

  const payload: any = verifyVerificationToken(token as string);

  if (!payload) {
    return res.status(400).send(`
      <div style="text-align:center; padding:50px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
        <h1 style="color:#dc3545;">Token Expired</h1>
        <p style="font-size:16px; color:#555;">
          Your verification link has expired. Please contact support or try signing up again.
        </p>
      </div>
    `);
  }

  const { id, role } = payload;

  try {
    // First check if user exists & is already verified
    const user =
      role === "recruiter"
        ? await findRecruiterByIdModel(id)
        : await findStudentByIdModel(id);

    if (!user) {
      return res.status(404).send(`
        <div style="text-align:center; padding:50px;">
          <h1>User not found</h1>
        </div>
      `);
    }

    if (user?.status === "Active") {
      // Already verified case
      const loginLink = `${process.env.FRONTEND_URL}/login`;
      return res.status(200).send(`
        <div style="text-align:center; padding:50px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
          <h1>Email Already Verified</h1>
          <p>You can now log in to your account.</p>
          <a href="${loginLink}" style="color: #0d6efd;">Go to Login</a>
        </div>
      `);
    }

    // Only activate if not already verified
    await activateUser(id, role);

    const loginLink = `${process.env.FRONTEND_URL}/login`;
    const html = generateLoginRedirectEmail(user.firstname, loginLink);

    res.status(200).send(html);
  } catch (error) {
    next(error);
  }
};
