import { Router } from "express";
import { authenticate } from "../../middlewares/auth.js";
import { authorizeRoles } from "../../middlewares/role.js";

import { UserRole } from "../../constants/roles.js";
import {
  createWorkerProfileController,
  editWorkerProfileController,
  getAllWorkersController,
  getWorkerByProfileUsernameController,
  getWorkerProfileByIdController,
  getWorkerProfileByUserIdController,
} from "./worker.controller.js";

const router = Router();

router.post(
  "/onboard",
  authenticate,
  authorizeRoles(UserRole.WORKER),
  createWorkerProfileController,
);

router.put(
  "/edit-onboard",
  authenticate,
  authorizeRoles(UserRole.WORKER),
  editWorkerProfileController,
);

router.get(
  "/:userId",
  authenticate,
  authorizeRoles(UserRole.ADMIN, UserRole.WORKER, UserRole.USER),
  getWorkerProfileByUserIdController,
);
router.get(
  "/profile/:id",
  authenticate,
  authorizeRoles(UserRole.ADMIN, UserRole.WORKER, UserRole.USER),
  getWorkerProfileByIdController,
);

router.get(
  "/username/:username",
  authenticate,
  authorizeRoles(UserRole.ADMIN, UserRole.WORKER, UserRole.USER),
  getWorkerByProfileUsernameController,
);

router.get("/all", authenticate, getAllWorkersController);

export default router;
