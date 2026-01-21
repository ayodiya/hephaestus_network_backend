import { Router } from "express";
import { authenticate } from "../../middlewares/auth.js";
import { authorizeRoles } from "../../middlewares/role.js";

import { UserRole } from "../../constants/roles.js";
import { createWorkerProfile, editWorkerProfile } from "./worker.controller.js";

const router = Router();

router.post(
  "/onboard",
  authenticate,
  authorizeRoles(UserRole.WORKER),
  createWorkerProfile,
);

router.put(
  "/edit-onboard",
  authenticate,
  authorizeRoles(UserRole.WORKER),
  editWorkerProfile,
);

export default router;
