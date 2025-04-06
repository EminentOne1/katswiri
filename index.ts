// server/index.ts
import express from "express";
import { renderPage } from "vite-plugin-ssr/server";

const app = express();

// ✅ Add middlewares
app.use(express.json()); // parse JSON requests
app.use("/api/custom", (req: any, res: any) => res.json({ hello: "world" })); // simple route

// ✅ SSR handler
app.get("*", async (req, res) => {
  const pageContext = await renderPage({ urlOriginal: req.originalUrl });
  const { httpResponse } = pageContext;

  if (!httpResponse) {
    res.status(404).send("Page not found");
    return;
  }

  const { body, statusCode, contentType } = httpResponse;
  res.status(statusCode).type(contentType).send(body);
});

export default app;
