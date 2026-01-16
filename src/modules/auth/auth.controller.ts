import { Request, Response } from "express";
import { registerUser, loginUser, passwordUserReset } from "./auth.service.js";

export async function register(req: Request, res: Response) {
  try {
    const user = await registerUser({ ...req.body, isVerified: true });
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

export async function login(req: Request, res: Response) {
  // Login logic to be implemented

  try {
    const user = await loginUser({ ...req.body });
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

export async function passwordReset(req: Request, res: Response) {
  try {
    const user = await passwordUserReset({ ...req.body });
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
