import { Router } from "express";
import { register, login, passwordReset } from "./auth.controller.js";
import { validateBody } from "../../middlewares/validate.js";
import { LoginDto, RegisterDto } from "./auth.dto.js";

const router = Router();

router.post("/register", validateBody(RegisterDto), register);
router.post("/login", validateBody(LoginDto), login);
router.post("/password-reset", passwordReset); // Placeholder for password reset

export default router;
