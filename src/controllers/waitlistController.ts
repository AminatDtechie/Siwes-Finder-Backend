import { Request, Response, NextFunction } from "express";
import {
  createWaitlistEntry,
  findWaitlistByEmail,
  getAllWaitlist,
} from "../models/waitklistModel";
import { sendEmail } from "../utils/email";
import { waitlistConfirmationEmail } from "../utils/templates/emailTemplates";

export const joinWaitlist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, name } = req.body;

  try {
    const existing = await findWaitlistByEmail(email);
    if (existing) {
      return res
        .status(409)
        .json({ success: false, message: "You are already on the waitlist" });
    }

    const newEntry = await createWaitlistEntry(email, name);

    // Send confirmation email
    const html = waitlistConfirmationEmail(name || "there");
    await sendEmail(email, "Welcome to the Siwes Finder Waitlist", html);

    res.status(201).json({
      success: true,
      message:
        "Successfully added to waitlist. A confirmation email has been sent.",
      data: newEntry,
    });
  } catch (error) {
    next(error);
  }
};

// Get all waitlist entries
export const getWaitlist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const entries = await getAllWaitlist();
    res.status(200).json({
      success: true,
      data: entries,
    });
  } catch (error) {
    next(error);
  }
};
