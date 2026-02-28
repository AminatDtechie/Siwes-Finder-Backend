import express from "express";
import { validate } from "../utils/middleware";
import { loginSchema } from "../utils/validationSchema";
import { login, verifyToken } from "../controllers/authController";
import passport from "passport";
import "../config/passport"; // initialize strategies
import jwt from "jsonwebtoken";
const router = express.Router();

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Authenticate a user and return a JWT token
 *     description: Allows a student or recruiter to log in using their email and password. Returns a JWT and user info on success.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: strongPassword123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                   description: JWT access token
 *                 role:
 *                   type: string
 *                   enum: [Student, Recruiter]
 *                 data:
 *                   type: object
 *                   description: User info (without password)
 *       400:
 *         description: Bad request – missing/invalid credentials or incorrect password
 *       403:
 *         description: Email not verified; a new verification link will be sent if applicable
 *       404:
 *         description: Account not found
 */
router.post("/login", validate(loginSchema), login);

/**
 * @swagger
 * /api/v1/verify-email:
 *   get:
 *     summary: Verify an email address using a token
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The verification token sent to the user's email
 *     responses:
 *       200:
 *         description: Email verified successfully; returns an HTML page or redirection message
 *       400:
 *         description: Missing or invalid token
 *       404:
 *         description: User not found
 */
router.get("/verify-email", verifyToken);

// Google Student Auth
/**
 * @swagger
 * /api/v1/auth/google/student:
 *   get:
 *     summary: Initiate Google OAuth for students
 *     tags:
 *       - Authentication
 *     description: Redirects the user to Google's OAuth consent screen to authenticate as a student. The server uses the `google-student` passport strategy and returns a JWT on successful callback.
 *     responses:
 *       302:
 *         description: Redirect to Google consent screen
 */
router.get(
  "/auth/google/student",
  passport.authenticate("google-student", {
    scope: ["profile", "email"],
    session: false,
    state: "student"
  })
);


// Google Recruiter Auth
/**
 * @swagger
 * /api/v1/auth/google/recruiter:
 *   get:
 *     summary: Initiate Google OAuth for recruiters
 *     tags:
 *       - Authentication
 *     description: Redirects the user to Google's OAuth consent screen to authenticate as a recruiter. The server uses the `google-recruiter` passport strategy and returns a JWT on successful callback.
 *     responses:
 *       302:
 *         description: Redirect to Google consent screen
 */
router.get(
  "/auth/google/recruiter",
  passport.authenticate("google-recruiter", {
    scope: ["profile", "email"],
    session: false,
    state: "recruiter", 
  })
);

// Single shared callback
/**
 * @swagger
 * /api/v1/auth/google/callback:
 *   get:
 *     summary: Google OAuth callback
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: query
 *         name: state
 *         schema:
 *           type: string
 *         required: true
 *         description: Role state that was passed during auth initiation (`student` or `recruiter`).
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         required: false
 *         description: Authorization code returned by Google
 *     responses:
 *       200:
 *         description: Login successful — returns JWT and user info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                 role:
 *                   type: string
 *                   example: Student
 *                 data:
 *                   type: object
 *                   description: User information (without password)
 *       401:
 *         description: Google authentication failed (redirects to /api/v1/auth/failed)
 */
router.get(
  "/auth/google/callback",
  (req, res, next) => {
    const role = req.query.state as string;
    const strategy = role === "recruiter" ? "google-recruiter" : "google-student";

    passport.authenticate(strategy, {
      session: false,
      failureRedirect: "/api/v1/auth/failed",
    })(req, res, next);
  },
  (req, res) => {
    const user = req.user as any;
    const { password, ...safeUser } = user;
    const role = safeUser.role;

    const token = jwt.sign(
      { ...safeUser, role },
      process.env.ACCESS_TOKEN!,
      { expiresIn: "24h" }
    );

    res.status(200).json({ message: "Login successful", token, role, data: safeUser });
  }
);

// Failure route
/**
 * @swagger
 * /api/v1/auth/failed:
 *   get:
 *     summary: Google authentication failed
 *     tags:
 *       - Authentication
 *     description: Returned when Google authentication fails or is denied.
 *     responses:
 *       401:
 *         description: Authentication failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Google authentication failed
 */
router.get("/auth/failed", (req, res) => {
  res.status(401).json({ message: "Google authentication failed" });
});

export default router;
