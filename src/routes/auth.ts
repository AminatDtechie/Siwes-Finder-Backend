import express from "express";
import { validate } from "../utils/middleware";
import { loginSchema } from "../utils/validationSchema";
import { login, verifyToken } from "../controllers/authController";
const router = express.Router();
router.post("/login", validate(loginSchema), login);

router.get("/verify-email", verifyToken);

export default router;
