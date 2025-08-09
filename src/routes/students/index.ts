import express from "express";
import { studentRegisterSchema, loginSchema } from "../../utils/validationSchema";
import { validate, verifyAuthentication } from "../../utils/middleware";
import { getProfile, signUpStudent } from "../../controllers/studentController";
const router = express.Router();

/**
 * @openapi
 * /api/v1/students/register:
 *   post:
 *     tags:
 *       - Students
 *     summary: Register a new student account
 *     description: Creates a new student user account after validating input and checking for duplicates.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstname
 *               - lastname
 *               - email
 *               - password
 *             properties:
 *               firstname:
 *                 type: string
 *                 example: John
 *               lastname:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: strongpassword123
 *     responses:
 *       201:
 *         description: Student account created successfully
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
 *                   example: Account created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     firstname:
 *                       type: string
 *                       example: John
 *                     lastname:
 *                       type: string
 *                       example: Doe
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *       409:
 *         description: User with this email already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: User exists
 *       500:
 *         description: Internal server error
 */
router.post("/register", validate(studentRegisterSchema), signUpStudent);

// router.get("/profile", verifyAuthentication, getProfile);

export default router;
