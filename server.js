import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import compression from "compression";
import dotenv from "dotenv";
import cors from "cors";
import songsRoutes from "./routes/songs.js";
import adminRoutes from "./routes/adminroutes.js";
import sessionManager from "./middleware/sessionManager.js";
import authRoutes from "./routes/authRoutes.js";
import sequelize from "./models/sequelize.js";
import "./models/index.js";
import serveStatic from "serve-static";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

async function runMigrations() {
  try {
    const force = process.env.NODE_ENV === "development";
    await sequelize.sync({ force, alter: !force });
    console.log("✅ Database synchronized successfully.");
  } catch (error) {
    console.error("❌ Error synchronizing database:", error);
    process.exit(1);
  }
}

async function createServer() {
  const app = express();
  await runMigrations();

  app.use(express.json());
  app.use(compression());
  app.use(
    cors({
      origin: ["http://localhost:5173"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  app.use("/api/v1/songs", songsRoutes);
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/adminroutes", sessionManager, adminRoutes);

  const isProduction = process.env.NODE_ENV === "development"; // Corrected condition

  if (isProduction) {
    app.use(serveStatic(path.resolve(__dirname, "dist/client")));
    app.use("*", async (req, res) => {
      try {
        const url = req.originalUrl;
        const template = fs.readFileSync(
          path.resolve(__dirname, "dist/client/index.html"),
          "utf-8"
        );
        const render = (await import("./dist/server/entry-server.js")).render;

        const { appHtml, headTags } = await render(url);

        const html = template
          .replace("<!--ssr-outlet-->", appHtml)
          .replace("<head>", `<head>${headTags}`);
        res.status(200).set({ "Content-Type": "text/html" }).send(html);
      } catch (error) {
        console.error("❌ SSR Error:", error);
        res.status(500).send("Internal Server Error");
      }
    });
  } else {
    const vite = await createViteServer({
      server: {
        middlewareMode: "ssr",
        hmr: { protocol: "ws", host: "localhost" },
      },
    });
    app.use(vite.middlewares);
  }

  app.use("*", async (req, res) => {
    try {
      const url = req.originalUrl;
      let template, render;

      if (isProduction) {
     
      } else {
        const vite = await createViteServer({
          server: { middlewareMode: "ssr" },
        });
        template = fs.readFileSync(
          path.resolve(__dirname, "index.html"),
          "utf-8"
        );
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule("/src/entry-server.tsx")).render;
      }

      const { appHtml, headTags } = await render(url);

      const html = template
        .replace("<!--ssr-outlet-->", appHtml)
        .replace("<head>", `<head>${headTags}`);
      res.status(200).set({ "Content-Type": "text/html" }).send(html);
    } catch (error) {
      console.error("❌ SSR Error:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}

createServer().catch((err) => {
  console.error("❌ Failed to start server:", err);
});
