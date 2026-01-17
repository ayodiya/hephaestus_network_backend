import type { Request } from "express";

export function getRequestContext(req: Request) {
  const userAgent = req.headers["user-agent"] || "unknown";

  const ipAddress =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
    req.socket.remoteAddress ||
    "unknown";

  return {
    ipAddress,
    userAgent,
  };
}
