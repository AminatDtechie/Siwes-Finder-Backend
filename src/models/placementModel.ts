import { and, eq, sql } from "drizzle-orm";
import { db } from "../db";
import { placementsTable } from "../db/schema";

type PlacementCreateInput = {
  industry: string;
  position_title: string;
  location: string;
  duration: string;
  description: string;
  position_type: 'onsite' | 'remote' | 'hybrid';
  salary_type: 'paid' | 'unpaid';
  salary_amount?: string;  // optional if unpaid
  recruiter_id: string; // uuid string
};

// Define a type for the filter options for better type safety
type PlacementFilters = {
    location?: string;
    position_type?: "onsite" | "remote" | "hybrid";
    salary_type?: "paid" | "unpaid";
    duration?: string;
    limit?: number;
    offset?: number;
};

// create a placement
export const createPlacementModel = async (placementData: PlacementCreateInput) => {
  const newPlacement = await db
    .insert(placementsTable)
    .values({
      ...placementData,
      salary_amount: placementData.salary_amount ?? '', // default empty string if undefined
    })
    .returning();

  return newPlacement[0];
};

// get all placements
export const findAllPlacementsModel = async (filters: PlacementFilters) => {
    const whereConditions = [
        filters.location ? eq(placementsTable.location, filters.location) : undefined,
        // 'filters.position_type' is now guaranteed to be of type PositionType
        filters.position_type ? eq(placementsTable.position_type, filters.position_type) : undefined,
        filters.salary_type ? eq(placementsTable.salary_type, filters.salary_type) : undefined,
        filters.duration ? eq(placementsTable.duration, filters.duration) : undefined,
    ];

    const placements = await db
        .select()
        .from(placementsTable)
        .where(and(...whereConditions)) 
        .orderBy(placementsTable.created_at)
        .limit(filters.limit || 10)
        .offset(filters.offset || 0);

    return placements;
};

//find placement by id
export const findPlacementById = async (id: string) => {

    const placement = await db
        .select()
        .from(placementsTable)
        .where(eq(placementsTable.id, id))
        .limit(1);
    return placement[0];

};