// api/v1.ts
import { VercelRequest, VercelResponse } from "@vercel/node";
import express from "express";
import { createServer } from "http";
import { parse } from "url";
import type { IncomingMessage, ServerResponse } from "http";

import songsRoutes from "../routes/songs.js";
import adminRoutes from "../routes/adminroutes.js";
import sessionManager from "../middleware/sessionManager.js";
import authRoutes from "../routes/authRoutes.js";

const app = express();
app.use(express.json());

// ✅ Test route
app.get("/api/v1/test", (_req, res) => {
  res.json({ message: "✅ Test route is working!" });
});

app.use("/api/v1/songs", songsRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/adminroutes", sessionManager, adminRoutes);

// Export a custom Node handler for Vercel
const server = createServer(app);

export default async function handler(
  req: VercelRequest | IncomingMessage,
  res: VercelResponse | ServerResponse
) {
  const parsedUrl = parse(req.url!, true);
  (req as VercelRequest).query = parsedUrl.query as {
    [key: string]: string | string[];
  };
  return app(req as VercelRequest, res as VercelResponse);
}
