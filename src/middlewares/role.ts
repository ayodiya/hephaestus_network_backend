// src/middleware/role.middleware.ts
import { Request, Response, NextFunction } from "express";
import { UserRole } from "../constants/roles.js";

export function authorizeRoles(...allowedRoles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        status: "Unauthorized",
        message: "Not authenticated",
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        status: "Forbidden",
        message: "You do not have permission to access this resource",
      });
    }

    next();
  };
}
