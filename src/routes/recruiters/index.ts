import express from "express";
import { validate } from "../../utils/middleware";
import { recruiterRegisterSchema } from "../../utils/validationSchema";
import { signUpRecruiter } from "../../controllers/recruiterController";
const router = express.Router();

/**
 * @openapi
 * /api/v1/recruiters/register:
 *   post:
 *     tags:
 *       - Recruiters
 *     summary: Register a new recruiter account
 *     description: Creates a new recruiter user account after validating input and checking for duplicates.
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
 *         description: Recruiter account created successfully
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
router.post("/register", validate(recruiterRegisterSchema), signUpRecruiter );

export default router;
