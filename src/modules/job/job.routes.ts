import { Router } from "express";
import {
  createJobController,
  editJobController,
  deleteJobController,
  getJobByIdController,
  getAllJobsController,
} from "./job.controller.js";
import { validateBody } from "../../middlewares/validate.js";
import { CreateJobDto } from "./dtos/create-job.dto.js";
import { authenticate } from "../../middlewares/auth.js";
import { authorizeRoles } from "../../middlewares/role.js";
import { UserRole } from "../../constants/roles.js";

const router = Router();

router.post(
  "/create",
  validateBody(CreateJobDto),
  authenticate,
  authorizeRoles(UserRole.USER, UserRole.ADMIN),
  createJobController,
);

router.put(
  "/edit/:jobId",
  validateBody(CreateJobDto),
  authenticate,
  authorizeRoles(UserRole.USER, UserRole.ADMIN),
  editJobController,
);

router.delete(
  "/delete/:jobId",
  authenticate,
  authorizeRoles(UserRole.USER, UserRole.ADMIN),
  deleteJobController,
);

router.get(
  "/:jobId",
  authenticate,
  authorizeRoles(UserRole.USER, UserRole.ADMIN, UserRole.WORKER),
  getJobByIdController,
);

router.get(
  "/",
  authenticate,
  authorizeRoles(UserRole.USER, UserRole.ADMIN, UserRole.WORKER),
  getAllJobsController,
);

export default router;
