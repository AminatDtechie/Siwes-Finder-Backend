import express from "express";
import {
  getWaitlist,
  joinWaitlist,
} from "../../controllers/waitlistController";

const router = express.Router();

router.post("/join", joinWaitlist);
router.get("/", getWaitlist);

export default router;
