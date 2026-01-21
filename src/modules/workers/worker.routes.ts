import { Router } from "express";
import { authenticate } from "../../middlewares/auth.js";
import { authorizeRoles } from "../../middlewares/role.js";

import { UserRole } from "../../constants/roles.js";
import {
  createWorkerProfile,
  editWorkerProfile,
  getAllWorkers,
  getWorkerByProfileUsername,
  getWorkerProfileById,
  getWorkerProfileByUserId,
} from "./worker.controller.js";

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

router.get(
  "/:userId",
  authenticate,
  authorizeRoles(UserRole.ADMIN, UserRole.WORKER, UserRole.USER),
  getWorkerProfileByUserId,
);
router.get(
  "/profile/:id",
  authenticate,
  authorizeRoles(UserRole.ADMIN, UserRole.WORKER, UserRole.USER),
  getWorkerProfileById,
);

router.get(
  "/username/:username",
  authenticate,
  authorizeRoles(UserRole.ADMIN, UserRole.WORKER, UserRole.USER),
  getWorkerByProfileUsername,
);

router.get("/all", authenticate, getAllWorkers);

export default router;
