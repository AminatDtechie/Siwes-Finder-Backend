// src/utils/email.ts
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs";
import {
  loginRedirectEmail,
  verificationEmail,
} from "./templates/emailTemplates";

const JWT_SECRET = process.env.ACCESS_TOKEN!;

// Create transporter using Gmail SMTP with SSL (port 465)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // SSL
  auth: {
    user: process.env.GOOGLE_APP_MAIL, // your Gmail
    pass: process.env.GOOGLE_APP_PASSWORD, // App Password
  },
});

// Verify transporter connection
export const verifyTransporter = async () => {
  try {
    await transporter.verify();
    console.log("✅ Mail server is ready to take our messages");
  } catch (err) {
    console.error("❌ Failed to verify transporter:", err);
  }
};

// Send email function
export const sendEmail = async (to: string, subject: string, body: string) => {
  try {
    const info = await transporter.sendMail({
      from: `"Siwes finder" <${process.env.GOOGLE_APP_MAIL}>`,
      to,
      subject,
      html: body,
    });
    return { success: true, info };
  } catch (err) {
    console.error("❌ Error sending email:", err);
    return { success: false, error: err };
  }
};

// Generate JWT token for verification
export const generateVerificationToken = (
  id: string,
  role: "Student" | "Recruiter"
) => {
  return jwt.sign({ id, role }, JWT_SECRET, { expiresIn: "24h" });
};

// Verify token
export const verifyVerificationToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
};

// Use template functions
export const generateVerificationEmail = (
  firstname: string,
  verificationLink: string
) => verificationEmail(firstname, verificationLink);

export const generateLoginRedirectEmail = (
  firstname: string,
  loginLink: string
) => loginRedirectEmail(firstname, loginLink);
