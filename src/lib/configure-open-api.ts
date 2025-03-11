import { apiReference } from "@scalar/hono-api-reference";
import { env } from "node:process";

import type { AppOpenAPI } from "./types";

import { auth } from "./auth";

export function configureAuthOpenApi(app: AppOpenAPI) {
  app.get("/openapi.json", async (c) => {
    const schema = await auth.api.generateOpenAPISchema();

    schema.info = {
      title: "Better Auth",
      description: "API Reference for your Auth Service.",
      version: "1.0.0",
    };

    return c.json(schema);
  });

  app.get(
    "/api/v1/auth/reference",
    apiReference({
      theme: "purple",
      layout: "classic",
      hideDownloadButton: true,
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
        url: "/openapi.json",
      },
    }),
  );
}

export function configureOpenApi(app: AppOpenAPI) {
  app.doc("/docs", {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Others API",
      description: "API Reference for your Other Services.",
    },
  });

  app.get(
    "/api/v1/reference",
    apiReference({
      theme: "purple",
      layout: "classic",
      hideDownloadButton: true,
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
