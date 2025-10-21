import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "very_secure_demo_jwt_secret_change_me";

export interface AuthRequest extends Request {
  user?: { username: string };
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const payload = jwt.verify(token, JWT_SECRET) as any;
    req.user = { username: payload.username };
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
