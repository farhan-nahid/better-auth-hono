import { apiReference } from "@scalar/hono-api-reference";

import env from "@/env";

import type { AppOpenAPI } from "./types";

import PackageJSON from "../../package.json";

export function configureOpenApi(app: AppOpenAPI) {
  app.doc("/docs", {
    openapi: "3.0.0",
    info: {
      version: PackageJSON.version,
      title: "Auth API",
    },
  });

  app.get(
    "/reference",
    apiReference({
      theme: "purple",
      layout: "classic",
      servers: [
        {
          url: `http://localhost:${env.PORT}`,
          description: "Development server",
        },
        {
          url: `http://localhost:${env.PORT}`,
          description: "Production server",
        },
      ],
      spec: {
        url: "/docs",
      },
    }),
  );
}
