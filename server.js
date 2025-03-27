import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import compression from "compression";
import dotenv from "dotenv";
import cors from "cors";
import songsRoutes from "./routes/songs.js";
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

async function createServer() {
  const app = express();
  app.use(compression());
  app.use(cors());
  app.use('/songs',songsRoutes);
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
