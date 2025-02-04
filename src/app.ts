import { cors } from "hono/cors";

import env from "@/env";
import { configureOpenApi } from "@/lib/configure-open-api";
import { createApp } from "@/lib/create-app";
import auth from "@/module/auth/auth.index";
import index from "@/module/index.route";

const app = createApp();
configureOpenApi(app);

const routes = [index, auth] as const;

// app.on(["POST", "GET"], "/api/v1/auth/**", (c) => {
//   return authServer.handler(c.req.raw);
// });

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

// const openAPISchema = await authServer.api.generateOpenAPISchema();
// console.log(JSON.stringify(openAPISchema));

export type AppType = typeof routes[number];

export { app };
