import type { Hook } from "@hono/zod-openapi";

import { OpenAPIHono } from "@hono/zod-openapi";

import { httpStatusCodes } from "@/constants";
import { notFound, onError, pinoLogger, serveEmojiFavicon } from "@/middlewares";

import type { AppBuildings } from "./types";

const defaultHook: Hook<any, any, any, any> = (result, c) => {
  if (!result.success) {
    return c.json(
      {
        success: result.success,
        error: result.error,
      },
      httpStatusCodes.UNPROCESSABLE_ENTITY,
    );
  }
};

function createRouter() {
  return new OpenAPIHono<AppBuildings>({ strict: false, defaultHook });
}

function createApp() {
  const app = createRouter();
  app.use(serveEmojiFavicon("🔐"));
  app.use(pinoLogger());

  app.notFound(notFound);
  app.onError(onError);

  return app;
}

export { createApp, createRouter };
