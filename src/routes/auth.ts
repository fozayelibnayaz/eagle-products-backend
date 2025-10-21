import { Router } from "express";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

const router = Router();

const DEMO_USER = {
  username: "demo@eagle.com",
  password: "DemoPassword123"
};

const JWT_SECRET = process.env.JWT_SECRET || "very_secure_demo_jwt_secret_change_me";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

router.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ message: "Missing credentials" });

  if (username === DEMO_USER.username && password === DEMO_USER.password) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    res.cookie("token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    return res.json({ username });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});

router.post("/logout", (req: Request, res: Response) => {
  res.clearCookie("token");
  return res.json({ ok: true });
});

export default router;
