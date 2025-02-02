import { cors } from "hono/cors";

// import { auth } from "./auth";
import { configureOpenApi } from "./lib/configure-open-api";
import { createApp } from "./lib/create-app";
import auth from "./module/auth/auth.index";
import index from "./module/index.route";

const app = createApp();
configureOpenApi(app);

const routes = [index, auth] as const;
// app.on(["POST", "GET"], "/api/auth/**", c => auth.handler(c.req.raw));
routes.forEach(route => app.route("/", route));

export type AppType = typeof routes[number];

export { app };

app.use(
  "/api/auth/**", // or replace with "*" to enable cors for all routes
  cors({
    origin: "http://localhost:3001", // replace with your origin
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);
