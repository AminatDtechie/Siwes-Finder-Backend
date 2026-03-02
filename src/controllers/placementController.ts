import { NextFunction, Request, Response } from "express";
import { createPlacementModel, findAllPlacementsModel, findPlacementById } from "../models/placementModel";
import { findRecruiterByIdModel } from "../models/recruiterModel";
import { placementQuerySchema } from "../utils/validationSchema";


// create a placement
export const createPlacement = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            industry,
            position_title,
            location,
            duration,
            description,
            position_type,
            salary_type,
            salary_amount,
            recruiter_id,
        } = req.body;

        // Require authentication and ensure the actor is a valid recruiter
        const actor = (req as any).user;
        if (!actor) {
            return res.status(401).json({ success: false, message: "Authentication required" });
        }

        if (actor.role !== "Recruiter") {
            return res.status(403).json({ success: false, message: "Only recruiters can create placements" });
        }

        // Verify recruiter exists in DB (prevents fake or deleted ids)
        const recruiterRecord = await findRecruiterByIdModel(actor.id);
        if (!recruiterRecord) {
            return res.status(404).json({ success: false, message: "Recruiter not found or invalid" });
        }

        // Use the authenticated recruiter's id for the placement
        const actorRecruiterId = actor.id;

        const newPlacement = await createPlacementModel({
            industry,
            position_title,
            location,
            duration,
            description,
            position_type,
            salary_type,
            salary_amount,
            recruiter_id: actorRecruiterId,
        });

        res.status(201).json({
            success: true,
            message: 'Placement created successfully',
            data: newPlacement,
        });
    } catch (error) {
        next(error);
    }
};


// get all placements
export const getAllPlacements = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // Validate and parse the query parameters using Zod
        const parsedFilters = placementQuerySchema.safeParse(req.query);

        if (!parsedFilters.success) {
            // Handle validation errors
            return res.status(400).json({ 
                success: false, 
                message: "Validation Error", 
                errors: parsedFilters.error.flatten().fieldErrors 
            });
        }
        
        // The validated data is now correctly typed
        const filters = parsedFilters.data;

        // 2. Fetch Data from DB
        const placements = await findAllPlacementsModel(filters);

        // 3. Apply Professional "Gated" Logic
        // If req.user is undefined, the user is a guest.
        const processedData = !req.user 
            ? placements.map((placement, index) => {
                if (index >= 2) {
                    return {
                        ...placement,
                        description: "Please login to see the full details of this placement.",
                        // Optional: You can also hide other sensitive fields here
                        isLocked: true // Helper flag for the frontend
                    };
                }
                return { ...placement, isLocked: false };
            })
            : placements.map(p => ({ ...p, isLocked: false }));

        res.status(200).json({
            success: true,
            message: "Placements fetched successfully",
            data: processedData,
        });
    } catch (error) {
        next(error);
    }
};


// find placement by ID
export const fetchPlacementById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(400).json("Id is needed to continue");
        }

        const placement = await findPlacementById(id);
        if (!placement) {
            return res.status(404).json("Placement not found");
        }

        // Apply the same logic: If guest, mask the description
        const processedData = !req.user 
            ? {
                ...placement,
                description: "Please login to see the full details of this placement.",
                isLocked: true
              }
            : { ...placement, isLocked: false };

        res.status(200).json({
            success: true,
            message: "Placement details found",
            data: processedData,
        });
    } catch (error) {
        next(error);
    }
};