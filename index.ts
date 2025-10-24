import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from '../../src/routes/auth';
import analyticsRoutes from '../../src/routes/analytics';

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

// For Vercel serverless compatibility
export default (req: any, res: any) => {
  const server = require('http').createServer(app);
  server.emit('request', req, res);
};
