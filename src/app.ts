import { cors } from "hono/cors";

import env from "@/env";
import { configureOpenApi } from "@/lib/configure-open-api";
import { createApp } from "@/lib/create-app";
import auth from "@/module/auth/auth.index";
import index from "@/module/index.route";

const app = createApp();
configureOpenApi(app);

const routes = [index, auth] as const;

routes.forEach(route => app.route("/api/v1", route));

app.use(
  "/api/v1/auth/**", // or replace with "*" to enable cors for all routes
  cors({
    origin: [env.BETTER_AUTH_URL, env.FRONTEND_URL], // replace with your origin
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

export type AppType = typeof routes[number];

export { app };
