import { Request, Response } from "express";
import {
  createJob,
  deleteJob,
  editJob,
  getAllJobs,
  getJobById,
} from "./job.service.js";

export async function createJobController(req: Request, res: Response) {
  try {
    const result = await createJob(req.user!.userId, req.body);
    return res.status(201).json({
      status: "success",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
}

export async function editJobController(req: Request, res: Response) {
  try {
    const result = await editJob(req.params.jobId, req.body);
    return res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
}

export async function deleteJobController(req: Request, res: Response) {
  try {
    const result = await deleteJob(req.params.jobId);
    return res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
}

export async function getJobByIdController(req: Request, res: Response) {
  try {
    const job = await getJobById(req.params.jobId);
    return res.status(200).json({
      status: "success",
      data: job,
    });
  } catch (error: any) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
}

export async function getAllJobsController(req: Request, res: Response) {
  try {
    const jobs = await getAllJobs();
    return res.status(200).json({
      status: "success",
      data: jobs,
    });
  } catch (error: any) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
}
