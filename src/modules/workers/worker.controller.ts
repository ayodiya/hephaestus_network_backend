import { Request, Response } from "express";
import { onboardWorker, editOnboardWorker } from "./worker.service.js";
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
