import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouterProvider } from "react-router-dom/server";
import { router } from "./router";

export async function render(url: string): Promise<string> {
  const context = {};
  return renderToString(
    <StaticRouterProvider router={router} context={context} location={url} />
  );
}
