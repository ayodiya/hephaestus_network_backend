import { Router } from "express";
import {
  registerController,
  loginController,
  passwordResetController,
} from "./auth.controller.js";
import { validateBody } from "../../middlewares/validate.js";
import { LoginDto, RegisterDto } from "./auth.dto.js";

const router = Router();

router.post("/register", validateBody(RegisterDto), registerController);
router.post("/login", validateBody(LoginDto), loginController);
router.post("/password-reset", passwordResetController); // Placeholder for password reset

export default router;
