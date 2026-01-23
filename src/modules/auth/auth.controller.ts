import { Request, Response } from "express";
import {
  registerUserService,
  loginUserService,
  passwordUserResetService,
} from "./auth.service.js";

export async function registerController(req: Request, res: Response) {
  try {
    const user = await registerUserService({ ...req.body, isVerified: true });
    return res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
}

export async function loginController(req: Request, res: Response) {
  try {
    const user = await loginUserService({ ...req.body }, req);

    return res.status(200).json({
      message: "User logged in successfully",
      user: { ...user },
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
}

export async function passwordResetController(req: Request, res: Response) {
  try {
    const user = await passwordUserResetService({ ...req.body });
    return res.status(200).json({
      message: "User logged in successfully",
      user,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
}
