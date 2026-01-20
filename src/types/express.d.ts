import { JwtPayload } from "jsonwebtoken";
import { UserRole } from "../constants/roles";

export interface AuthPayload extends JwtPayload {
  userId: string;
  role: UserRole;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}
