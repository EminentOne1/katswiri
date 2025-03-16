import { hydrateRoot, createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(" Root element not found");
}

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, <RouterProvider router={router} />);
} else {
  createRoot(rootElement).render(<RouterProvider router={router} />);
}
