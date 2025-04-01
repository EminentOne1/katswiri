import React from "react";
import { renderToString } from "react-dom/server";
import { StaticHandlerContext, StaticRouterProvider } from "react-router-dom/server";
import { router } from "./router";

export async function render(url: string): Promise<string> {
  const context: StaticHandlerContext = {
    basename: "",
    location: {
      pathname: new URL(url).pathname,
      search: new URL(url).search,
      hash: new URL(url).hash,
      state: null,
      key: "default",
    },
    matches: [],
    loaderData: {},
    actionData: null,
    errors: null,
    statusCode: 0,
    loaderHeaders: {},
    actionHeaders: {},
    activeDeferreds: null
  };
  return renderToString(
    <StaticRouterProvider router={router} context={context} />
  );
}