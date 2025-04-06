// api/v1.ts
import { VercelRequest, VercelResponse } from "@vercel/node";
import express from "express";
import { createServer } from "http";
import { parse } from "url";
import { IncomingMessage, ServerResponse, IncomingHttpHeaders } from "http";

import songsRoutes from "../routes/songs";
import authRoutes from "../routes/authRoutes";
import adminRoutes from "../routes/adminRoutes";
import sessionManager from "../middleware/sessionManager";

const app = express();
app.use(express.json());

app.get("/api/v1/test", (_req, res) => {
  res.json({ message: "✅ Test route is working!" });
});

app.use("/api/v1/songs", songsRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/adminroutes", sessionManager, adminRoutes);

const server = createServer(app);

export default async function handler(
  req: VercelRequest | IncomingMessage,
  res: VercelResponse | ServerResponse
) {
  if (req instanceof IncomingMessage) {
    const parsedUrl = parse(req.url!, true);
    (req as any).query = parsedUrl.query;
    (req as any).headers = req.headers;
    return app(req as any, res as any);
  }

  return app(req, res);
}
