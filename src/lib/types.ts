import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";
import type { PinoLogger } from "hono-pino";

import type { auth } from "@/auth";

interface AppBuildings {
  Variables: {
    logger: PinoLogger;
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}

type AppOpenAPI = OpenAPIHono<AppBuildings>;
type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppBuildings>;

export type { AppBuildings, AppOpenAPI, AppRouteHandler };
