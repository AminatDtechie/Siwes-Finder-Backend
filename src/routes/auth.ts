import express from "express";
import { validate } from "../utils/middleware";
import { loginSchema } from "../utils/validationSchema";
import { login, verifyToken } from "../controllers/authController";
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

export default router;
