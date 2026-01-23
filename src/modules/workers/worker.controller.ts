import { Request, Response } from "express";
import {
  onboardWorkerService,
  editOnboardWorkerService,
  getWorkerByIdService,
  getWorkerByUserIdService,
  listAllWorkersService,
  getWorkerByUsernameService,
} from "./worker.service.js";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateWorkerDto } from "./create-worker.dto.js";

export async function createWorkerProfileController(
  req: Request,
  res: Response,
) {
  const dto = plainToInstance(CreateWorkerDto, req.body);
  const errors = await validate(dto);

  if (errors.length > 0) {
    return res.status(400).json({
      status: "Bad Request",
      errors,
    });
  }

  try {
    const result = await onboardWorkerService(req.user!.userId, dto);

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

export async function editWorkerProfileController(req: Request, res: Response) {
  try {
    const result = await editOnboardWorkerService(req.user!.userId, req.body);

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

export async function getWorkerProfileByIdController(
  req: Request,
  res: Response,
) {
  try {
    const worker = await getWorkerByIdService(req.params.id);

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

export async function getWorkerProfileByUserIdController(
  req: Request,
  res: Response,
) {
  try {
    const worker = await getWorkerByUserIdService(req.user!.userId);

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

export async function getWorkerByProfileUsernameController(
  req: Request,
  res: Response,
) {
  try {
    const worker = await getWorkerByUsernameService(req.params.username);

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

export async function getAllWorkersController(req: Request, res: Response) {
  try {
    const users = await listAllWorkersService();
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
