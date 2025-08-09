import { NextFunction, Request, Response } from "express";
import { createPlacementModel, findAllPlacementsModel, findPlacementById } from "../models/placementModel";
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

        const newPlacement = await createPlacementModel({
            industry,
            position_title,
            location,
            duration,
            description,
            position_type,
            salary_type,
            salary_amount,
            recruiter_id,
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

        const placements = await findAllPlacementsModel(filters);

        res.status(200).json({
            success: true,
            message: "Placements fetched successfully",
            data: placements,
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
        //checking if id is passed in
        if (!id) {
            res.status(400).json("Id is neded to continue");
            return;
        }

        // chcecking if placement is available
        const placement = await findPlacementById(id);
        if (!placement) {
            res.status(404).json("Placement not found");
            return;
        }

        res.status(200).json({
            success: true,
            message: "Placement details found",
            data: placement,
        });
    } catch (error) {
        next(error);
    }
};