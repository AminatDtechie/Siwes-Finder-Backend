import express from "express";
import { validate } from "../../utils/middleware";
import { recruiterRegisterSchema } from "../../utils/validationSchema";
import {
  deleteRecruiterDetails,
  fetchRecruiters,
  signUpRecruiter,
} from "../../controllers/recruiterController";
const router = express.Router();

router.post("/register", validate(recruiterRegisterSchema), signUpRecruiter);
router.get("/", fetchRecruiters);
router.delete("/:id", deleteRecruiterDetails);

export default router;
