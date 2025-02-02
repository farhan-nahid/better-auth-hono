import { cors } from "hono/cors";

// import { auth } from "./auth";
import { configureOpenApi } from "./lib/configure-open-api";
import { createApp } from "./lib/create-app";
import auth from "./module/auth/auth.index";
import index from "./module/index.route";

const app = createApp();
configureOpenApi(app);

const routes = [index, auth] as const;

routes.forEach(route => app.route("/api/v1", route));

export type AppType = typeof routes[number];

export { app };

app.use(
  "/api/v1/auth/**", // or replace with "*" to enable cors for all routes
  cors({
    origin: "http://localhost:3001", // replace with your origin
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);
