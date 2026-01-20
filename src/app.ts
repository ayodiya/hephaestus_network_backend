import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import redisClient from "./cache/redisClient.js";
import { AppDataSource } from "./database/data-source.js";

import requestContextMiddleware from "./middlewares/requestContext.js";
import authRoutes from "./modules/auth/auth.routes.js";

const PORT = process.env.PORT || 3000;

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestContextMiddleware);

//Routes
app.use("/api/auth", authRoutes);

/**
 * Health check
 */
app.get("/health", async (_req, res) => {
  const redisStatus = redisClient.status === "ready" ? "up" : "down";

  res.json({
    status: "ok",
    redis: redisStatus,
    uptime: process.uptime(),
  });
});

async function startServer() {
  try {
    await AppDataSource.initialize();
    console.log("✅ PostgreSQL connected (TypeORM)");

    await redisClient.ping();
    console.log("Redis connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed", error);
    process.exit(1);
  }
}

startServer();
