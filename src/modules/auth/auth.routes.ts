import { Router } from "express";
import { register } from "./auth.controller.js";
import { validateBody } from "../../middlewares/validate.js";
import { RegisterDto } from "./auth.dto.js";

const router = Router();

router.post("/register", validateBody(RegisterDto), register);

export default router;