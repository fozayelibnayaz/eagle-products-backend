import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth";
import analyticsRoutes from "./routes/analytics";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: [process.env.FRONTEND_ORIGIN || "http://localhost:3000"],
  credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/analytics", analyticsRoutes);

const PORT = Number(process.env.PORT || 4000);
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});