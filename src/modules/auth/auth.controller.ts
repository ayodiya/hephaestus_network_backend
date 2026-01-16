import { Request, Response } from "express";
import { registerUser } from "./auth.service.js";

export async function register(req: Request, res: Response) {
  try {
    const user = await registerUser({...req.body,isVerified: true });
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