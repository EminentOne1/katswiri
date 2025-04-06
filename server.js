import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import compression from "compression";
import dotenv from "dotenv";
import cors from "cors";
import serveStatic from "serve-static";

import songsRoutes from "./routes/songs.js";
import adminRoutes from "./routes/adminroutes.js";
import sessionManager from "./middleware/sessionManager.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === "production";

async function createServer() {
  const app = express();

  app.use(express.json());
  app.use(compression());
  app.use(
    cors({
      origin: ["http://localhost:5000"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  app.use("/api/v1/songs", songsRoutes);
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/adminroutes", sessionManager, adminRoutes);

  if (isProduction) {
    app.use(serveStatic(path.resolve(__dirname, "dist/client")));

    app.use("*", async (req, res, next) => {
      if (req.originalUrl.startsWith("/api")) return next();

      try {
        const url = req.originalUrl;
        const template = fs.readFileSync(
          path.resolve(__dirname, "dist/client/index.html"),
          "utf-8"
        );
        const { render } = await import("./dist/server/entry-server.js");

        const { appHtml, headTags } = await render(url);
        const html = template
          .replace("<!--ssr-outlet-->", appHtml)
          .replace("<head>", `<head>${headTags}`);

        res.status(200).set({ "Content-Type": "text/html" }).send(html);
      } catch (error) {
        console.error("❌ SSR Error (Production):", error);
        res.status(500).send("Internal Server Error");
      }
    });
  } else {
    const vite = await createViteServer({
      server: {
        middlewareMode: "ssr",
        hmr: { protocol: "ws", host: "localhost" },
      },
      appType: "custom",
    });

    app.use(vite.middlewares);

    app.use("*", async (req, res, next) => {
      if (req.originalUrl.startsWith("/api")) return next();

      try {
        const url = req.originalUrl;
        let template = fs.readFileSync(
          path.resolve(__dirname, "index.html"),
          "utf-8"
        );

        template = await vite.transformIndexHtml(url, template);
        const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");
        const { appHtml, headTags } = await render(url);

        const html = template
          .replace("<!--ssr-outlet-->", appHtml)
          .replace("<head>", `<head>${headTags}`);

        res.status(200).set({ "Content-Type": "text/html" }).send(html);
      } catch (error) {
        console.error("❌ SSR Error (Dev):", error);
        res.status(500).send("Internal Server Error");
      }
    });
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}

createServer().catch((err) => {
  console.error("❌ Failed to start server:", err);
});
