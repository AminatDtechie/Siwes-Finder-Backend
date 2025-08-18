import nodemailer from "nodemailer"
import jwt from "jsonwebtoken";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GOOGLE_APP_MAIL,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

await transporter.verify();
console.log("Server is ready to take our messages");

const JWT_SECRET = process.env.ACCESS_TOKEN!

export const sendEmail = async (to: string, subject: string, body: string) => {
  try {
    const info = await transporter.sendMail({
      from: `"Siwes Finder" <${process.env.GOOGLE_APP_MAIL}>`, // use your Gmail
      to,
      subject,
      html: body,
    });

    // console.log("Message sent: %s", info.messageId);
    return { success: true, info };
  } catch (err) {
    console.error("Error sending email:", err);
    return { success: false, error: err };
  }
};


export const generateVerificationEmail = (firstname: string, verificationLink: string) => {
  return `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #0d6efd;">Welcome to Siwes Finder, ${firstname}!</h2>
    <p>Thank you for signing up. Please verify your email to activate your account.</p>
    <a 
      href="${verificationLink}" 
      style="display:inline-block; padding:10px 20px; background-color:#0d6efd; color:white; text-decoration:none; border-radius:5px; margin: 15px 0;"
    >
      Verify Email
    </a>
    <p>If the button doesn’t work, copy and paste this link into your browser:</p>
    <p><a href="${verificationLink}">${verificationLink}</a></p>
    <hr />
    <p style="font-size: 12px; color: #666;">If you didn’t sign up for Siwes Finder, you can ignore this email.</p>
  </div>
  `;
};


// role can be 'student' or 'recruiter'
export const generateVerificationToken = (id: string, role: "Student" | "Recruiter") => {
  const token = jwt.sign(
    { id, role },
    JWT_SECRET,
    { expiresIn: "24h" }
  );
  return token;
};

export const verifyVerificationToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};