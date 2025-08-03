import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

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
  const reqToken = req.headers["authorization"]?.split(" ");
  const token = reqToken && reqToken[1];
  try {
    if (token === undefined) {
      res.status(401).json("No token found");
      return;
    }
    const valid = jwt.verify(token, process.env.ACCESS_TOKEN!);

    req.user = valid;
  } catch (error) {
    res.status(403).json("Token Expired");
  }
};
