import express from "express";
import { validate } from "../utils/middleware";
import { loginSchema } from "../utils/validationSchema";
import { login } from "../controllers/authController";
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

export default router;

