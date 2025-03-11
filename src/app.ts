import { cors } from "hono/cors";

import { auth } from "@/lib/auth";
import { createApp } from "@/lib/create-app";
import healthCheck from "@/module/index.route";

import env from "./env";
import { configureAuthOpenApi, configureOpenApi } from "./lib/configure-open-api";

const app = createApp();
app.use(
  "/api/v1/auth/*",
  cors({
    origin: [env.FRONTEND_URL, env.BETTER_AUTH_URL],
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

configureAuthOpenApi(app);
configureOpenApi(app);

const routes = [healthCheck] as const;

routes.forEach(route => app.route("/api/v1", route));

app.on(["POST", "GET"], "/api/v1/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

// app.get("/api/v1/session", async (c) => {
//   const session = c.get("session");
//   const user = c.get("user");

//   if (!user) {
//     return c.body(null, 401);
//   }

//   return c.json({ session, user });
// });

// export type AppType = typeof routes[number];

export { app };
