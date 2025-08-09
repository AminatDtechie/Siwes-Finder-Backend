import express from "express";
import { authorizeRole, validate, verifyAuthentication } from "../../utils/middleware";
import { createPlacement, fetchPlacementById, getAllPlacements } from "../../controllers/placementController";
import { createPlacementSchema } from "../../utils/validationSchema";
const router = express.Router();

/**
 * @swagger
 * /api/v1/placements:
 *   get:
 *     summary: Get list of placements with optional filters and pagination
 *     tags:
 *       - Placements
 *     parameters:
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Filter placements by location
 *       - in: query
 *         name: position_type
 *         schema:
 *           type: string
 *           enum: [onsite, remote, hybrid]
 *         description: Filter placements by position type
 *       - in: query
 *         name: salary_type
 *         schema:
 *           type: string
 *           enum: [paid, unpaid]
 *         description: Filter placements by salary type
 *       - in: query
 *         name: duration
 *         schema:
 *           type: string
 *         description: Filter placements by duration
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of placements to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Number of placements to skip
 *     responses:
 *       200:
 *         description: List of placements
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
 *                     $ref: '#/components/schemas/Placement'
 */
router.get("/", getAllPlacements);


/**
 * @swagger
 * /api/v1/placements/{id}:
 *   get:
 *     summary: Get placement by ID
 *     description: Retrieve detailed information about a specific placement using its ID.
 *     tags:
 *       - Placements
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The unique ID of the placement to fetch.
 *     responses:
 *       200:
 *         description: Placement details found
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
 *                   example: Placement details found
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *                     industry:
 *                       type: string
 *                       example: "Tech"
 *                     position_title:
 *                       type: string
 *                       example: "Frontend Developer Intern"
 *                     location:
 *                       type: string
 *                       example: "Remote"
 *                     duration:
 *                       type: string
 *                       example: "3 months"
 *                     description:
 *                       type: string
 *                       example: "Work with senior engineers to build user-facing features."
 *                     position_type:
 *                       type: string
 *                       enum: [onsite, remote, hybrid]
 *                       example: "remote"
 *                     salary_type:
 *                       type: string
 *                       enum: [paid, unpaid]
 *                       example: "paid"
 *                     salary_amount:
 *                       type: string
 *                       example: "₦100k/month"
 *                     recruiter_id:
 *                       type: string
 *                       format: uuid
 *                       example: "7b9fdf4e-c967-4adf-8aeb-eda756ec9e5a"
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-08-09T12:34:56.789Z"
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-08-09T12:34:56.789Z"
 *                     deleted_at:
 *                       type: string
 *                       format: date-time
 *                       nullable: true
 *                       example: null
 *       400:
 *         description: Missing or invalid ID parameter
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Id is needed to continue"
 *       404:
 *         description: Placement not found
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Placement not found"
 */
router.get("/:id", fetchPlacementById);


/**
 * @swagger
 * /api/v1/placements:
 *   post:
 *     summary: Create a new placement
 *     description: Allows a recruiter to create a new placement posting.
 *     tags:
 *       - Placements
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - industry
 *               - position_title
 *               - location
 *               - duration
 *               - description
 *               - position_type
 *               - salary_type
 *               - salary_amount
 *               - recruiter_id
 *             properties:
 *               industry:
 *                 type: string
 *                 example: Fintech
 *               position_title:
 *                 type: string
 *                 example: Frontend Developer Intern
 *               location:
 *                 type: string
 *                 example: Osun
 *               duration:
 *                 type: string
 *                 example: 3 months
 *               description:
 *                 type: string
 *                 example: Work with senior engineers to build user-facing features using React and Tailwind CSS.
 *               position_type:
 *                 type: string
 *                 enum: [onsite, remote, hybrid]
 *                 example: remote
 *               salary_type:
 *                 type: string
 *                 enum: [paid, unpaid]
 *                 example: paid
 *               salary_amount:
 *                 type: string
 *                 example: ₦100,000/month
 *               recruiter_id:
 *                 type: string
 *                 format: uuid
 *                 example: afa3cadf-8189-4435-bb1e-e0407b1e963c
 *     responses:
 *       201:
 *         description: Placement created successfully
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
 *                   example: Placement created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     industry:
 *                       type: string
 *                     position_title:
 *                       type: string
 *                     location:
 *                       type: string
 *                     duration:
 *                       type: string
 *                     description:
 *                       type: string
 *                     position_type:
 *                       type: string
 *                     salary_type:
 *                       type: string
 *                     salary_amount:
 *                       type: string
 *                     recruiter_id:
 *                       type: string
 *                       format: uuid
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Bad Request - Invalid input data
 *       401:
 *         description: Unauthorized - recruiter must be logged in
 */
router.post(
    "/",
    verifyAuthentication,
    authorizeRole(["Recruiter"]),
    validate(createPlacementSchema),
    createPlacement
)

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Placement:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "d290f1ee-6c54-4b01-90e6-d701748f0851"
 *         industry:
 *           type: string
 *           example: "Fintech"
 *         position_title:
 *           type: string
 *           example: "Frontend Developer Intern"
 *         location:
 *           type: string
 *           example: "Remote"
 *         duration:
 *           type: string
 *           example: "3 months"
 *         description:
 *           type: string
 *           example: "Work with senior engineers to build user-facing features using React and Tailwind CSS."
 *         position_type:
 *           type: string
 *           enum: [onsite, remote, hybrid]
 *           example: "remote"
 *         salary_type:
 *           type: string
 *           enum: [paid, unpaid]
 *           example: "paid"
 *         salary_amount:
 *           type: string
 *           example: "₦100,000/month"
 *         recruiter_id:
 *           type: string
 *           format: uuid
 *           example: "afa3cadf-8189-4435-bb1e-e0407b1e963c"
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2024-08-10T14:48:00.000Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           example: "2024-08-10T14:48:00.000Z"
 *         deleted_at:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: null
 */