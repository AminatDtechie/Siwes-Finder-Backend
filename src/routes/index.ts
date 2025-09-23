import express from "express";
import studentRouter from "./students";
import recruiterRouter from "./recruiters";
import placementRouter from "./placements";
import waitlistRouter from "./waitlist";
import authRouter from "./auth";
const router = express.Router();

router.use("/students", studentRouter);
router.use("/recruiters", recruiterRouter);
router.use("/placements", placementRouter);
router.use("/waitlists", waitlistRouter);
router.use("/", authRouter);

export default router;
