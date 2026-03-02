import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ZodObject, ZodError, z } from "zod";

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const errorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || "Something went wrong";
  res.status(errStatus).json({
    success: false,
    mesage: errMessage,
    stack: err.stack,
  });
};

export const verifyAuthentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  try {
    if (!token) {
      return res.status(401).json("No token found");
    }

    const valid = jwt.verify(token, process.env.ACCESS_TOKEN!);
    req.user = valid;

    // console.log( req.user )

    next();
  } catch (error) {
    return res.status(403).json("Token Expired or Invalid");
  }
};


// This middleware allows both authenticated and unauthenticated users to access routes. If a valid JWT is provided, it attaches the user info to req.user. If no token or an invalid token is present, it simply moves on without setting req.user, allowing the route handler to treat them as a guest.
export const checkAuthOptional = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    // No token? No problem. Just move to the next step as a guest.
    return next();
  }

  try {
    const valid = jwt.verify(token, process.env.ACCESS_TOKEN!);
    req.user = valid; // Attach user info if the token is legit
    next();
  } catch (error) {
    // If token is expired/invalid, we still let them through, 
    // but req.user remains undefined (Guest mode).
    next();
  }
};



export function prettifyZodError(err: ZodError) {
  const flattened = err.flatten();

  return Object.entries(flattened.fieldErrors).flatMap(([field, messages]) => {
    if (!messages || !Array.isArray(messages)) {
      return [];
    }

    return messages.map((message) => ({
      field,
      message,
    }));
  });
}

export const validate =
  (schema: ZodObject<any>) =>
    (req: Request, res: Response, next: NextFunction) => {
      try {
        schema.parse(req.body);
        next();
      } catch (err) {
        if (err instanceof ZodError) {
          return res.status(400).json({
            error: "Validation error",
            details: prettifyZodError(err),
          });
        }
        next(err);
      }
    };


    // Authorize users based on their role
export const authorizeRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user; // assuming req.user is set after JWT verification

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: "Forbidden: insufficient role" });
    }

    next();
  };
};