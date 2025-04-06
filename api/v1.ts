// api/v1.ts

import { VercelRequest, VercelResponse } from "@vercel/node";
import express from "express";
import { default as serverlessExpress } from "@vendia/serverless-express";

import songsRoutes from "../routes/songs.js";
import adminRoutes from "../routes/adminroutes.js";
import sessionManager from "../middleware/sessionManager.js";
import authRoutes from "../routes/authRoutes.js";

const app = express();
app.use(express.json());

app.get("/test", (req, res) => {
  res.json({ message: "✅ Test route is working!" });
});

app.use("/api/v1/songs", songsRoutes);

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/adminroutes", sessionManager, adminRoutes);

// Export handler for Vercel
export default (req: VercelRequest, res: VercelResponse) => {
  const handler = serverlessExpress({ app });
  return handler(req, res);
};
