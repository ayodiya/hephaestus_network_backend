import { Request, Response } from "express";
import {
  onboardWorker,
  editOnboardWorker,
  getWorkerById,
  getWorkerByUserId,
  listAllWorkers,
  getWorkerByUsername,
} from "./worker.service.js";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateWorkerDto } from "./create-worker.dto.js";

export async function createWorkerProfile(req: Request, res: Response) {
  const dto = plainToInstance(CreateWorkerDto, req.body);
  const errors = await validate(dto);

  if (errors.length > 0) {
    return res.status(400).json({
      status: "Bad Request",
      errors,
    });
  }

  try {
    const result = await onboardWorker(req.user!.userId, dto);

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

export async function editWorkerProfile(req: Request, res: Response) {
  try {
    const result = await editOnboardWorker(req.user!.userId, req.body);

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

export async function getWorkerProfileById(req: Request, res: Response) {
  try {
    const worker = await getWorkerById(req.params.id);

    return res.status(200).json({
      status: "success",
      data: worker,
    });
  } catch (error: any) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
}

export async function getWorkerProfileByUserId(req: Request, res: Response) {
  try {
    const worker = await getWorkerByUserId(req.user!.userId);

    return res.status(200).json({
      status: "success",
      data: worker,
    });
  } catch (error: any) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
}

export async function getWorkerByProfileUsername(req: Request, res: Response) {
  try {
    const worker = await getWorkerByUsername(req.params.username);

    return res.status(200).json({
      status: "success",
      data: worker,
    });
  } catch (error: any) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
}

export async function getAllWorkers(req: Request, res: Response) {
  try {
    const users = await listAllWorkers();
    // Implementation to get all workers
    return res.status(200).json({
      status: "success",
      data: [...users], // Replace with actual data
    });
  } catch (error: any) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
}
