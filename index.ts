import express from "express";
import { renderPage } from "vite-plugin-ssr/server";

const app = express();

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
