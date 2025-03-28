import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import compression from "compression";
import dotenv from "dotenv";
import cors from "cors";
import songsRoutes from "./routes/songs.js";
import adminRoutes from './routes/adminroutes.js';
import loginMiddleware from './middleware/authMiddleware.js';
import { verifyToken } from './src/utils/session.js';
import sessionManager from './middleware/sessionManager.js'; 
import authRoutes from './routes/authRoutes.js'; 
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

async function createServer() {
  const app = express();
  app.use(express.json()); 
  app.use(compression());
  app.use(cors({
    origin: ['http://localhost:5000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
  app.use('/songs',songsRoutes);
  app.use('/api/auth', authRoutes);
  app.use('/adminroutes', sessionManager, adminRoutes);

  const vite = await createViteServer({
    server: { 
      middlewareMode: "ssr",
      hmr: { protocol: "ws", host: "localhost" },
    },
  });
  app.use(vite.middlewares);
 
  app.use("*", async (req, res) => {
    try {
      const url = req.originalUrl;
     
      let template = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf-8");
     
      template = await vite.transformIndexHtml(url, template);
    
      const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");
    
      const { appHtml, headTags } = await render(url);
     
      const html = template
        .replace("<!--ssr-outlet-->", appHtml)  
        .replace("<head>", `<head>${headTags}`); 
      res.status(200).set({ "Content-Type": "text/html" }).send(html);
    } catch (error) {
      vite.ssrFixStacktrace(error);
      console.error(`[${new Date().toISOString()}] SSR Error:`, error);
      res.status(500).send("Internal Server Error");
    }
  });


  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

createServer().catch((err) => {
  console.error("Failed to start server:", err);
});
