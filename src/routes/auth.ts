import express from "express";
import { validate } from "../utils/middleware";
import { loginSchema } from "../utils/validationSchema";
import { login, verifyToken } from "../controllers/authController";
const router = express.Router();

/**
 * @openapi
 * /api/v1/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Sign in a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: strongpassword123
 *     responses:
 *       201:
 *         description: Login successful
 *       400:
 *         description: Bad request
 */
router.post("/login", validate(loginSchema), login );


/**
 * @openapi
 * /api/v1/verify-email:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Verify a user's email using the token
 *     description: Activates a student's or recruiter's account when they click the verification link.
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *         description: Verification token sent via email
 *     responses:
 *       200:
 *         description: Email verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Email verified successfully! You can now log in.
 *       400:
 *         description: Invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid token
 */
router.get("/verify-email", verifyToken);


export default router;

