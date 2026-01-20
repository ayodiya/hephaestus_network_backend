import type { Request, Response, NextFunction } from "express";
import { getRequestContext } from "../utils/requestContext.js";

export default function requestContextMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const context = getRequestContext(req);
  (req as any).context = context;
  next();
}
