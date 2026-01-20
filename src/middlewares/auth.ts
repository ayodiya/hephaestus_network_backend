// src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthPayload } from "../types/express.js";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const token =
    req.header("x-auth-token") ||
    req.header("authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      status: "Unauthorized",
      code: "401",
      message: "Access denied. No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as AuthPayload;

    req.user = decoded;
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        status: "Unauthorized",
        code: "401",
        message: "Token has expired",
      });
    }

    return res.status(401).json({
      status: "Unauthorized",
      code: "401",
      message: "Invalid token",
    });
  }
}
