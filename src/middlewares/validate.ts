import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export function validateBody(dto: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const instance = plainToInstance(dto, req.body);
    const errors = await validate(instance);

    if (errors.length > 0) {
      return res.status(400).json({
        message: "Validation failed",
        errors,
      });
    }

    req.body = instance;
    next();
  };
}
