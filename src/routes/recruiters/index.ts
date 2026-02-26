import express from "express";
import { validate } from "../../utils/middleware";
import { recruiterRegisterSchema } from "../../utils/validationSchema";
import {
  deleteRecruiterDetails,
  fetchRecruiters,
  signUpRecruiter,
} from "../../controllers/recruiterController";
const router = express.Router();

/**
 * @swagger
 * /api/v1/recruiters/register:
 *   post:
 *     summary: Register a new recruiter
 *     description: Creates a recruiter account with first name, last name, email, and password.
 *     tags:
 *       - Recruiters
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
 *                 example: Jane
 *               lastname:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: jane.doe@example.com
 *               password:
 *                 type: string
 *                 example: strongPass1
 *     responses:
 *       201:
 *         description: Recruiter registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Recruiter created successfully
 *                 data:
 *                   type: object
 *                   description: Created recruiter data without password
 *       400:
 *         description: Bad request - validation error
 */
router.post("/register", validate(recruiterRegisterSchema), signUpRecruiter);
/**
 * @swagger
 * /api/v1/recruiters/:
 *   get:
 *     summary: Retrieve all recruiters
 *     tags:
 *       - Recruiters
 *     responses:
 *       200:
 *         description: List of recruiters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                       firstname:
 *                         type: string
 *                       lastname:
 *                         type: string
 *                       email:
 *                         type: string
 *                         format: email
 */
router.get("/", fetchRecruiters);
/**
 * @swagger
 * /api/v1/recruiters/{id}:
 *   delete:
 *     summary: Delete a recruiter by ID
 *     tags:
 *       - Recruiters
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the recruiter to delete
 *     responses:
 *       200:
 *         description: Recruiter deleted successfully
 *       400:
 *         description: Invalid ID supplied
 *       404:
 *         description: Recruiter not found
 */
router.delete("/:id", deleteRecruiterDetails);

export default router;
