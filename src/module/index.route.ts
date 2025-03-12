import { createRoute, z } from "@hono/zod-openapi";

import { httpStatusCodes } from "@/constants";
import { createRouter } from "@/lib/create-app";

const HealthResponseSchema = z.object({
  message: z.string(),
});

const router = createRouter().openapi(
  createRoute({
    tags: ["Health"],
    method: "get",
    path: "/health",
    summary: "Health check",
    description: "Check if the server is running",
    responses: {
      [httpStatusCodes.OK]: {
        description: "Server is running",
        content: {
          "application/json": {
            schema: HealthResponseSchema,
          },
        },
      },
    },
  }),
  (ctx) => {
    return ctx.json({ message: "Auth Api server is running" }, httpStatusCodes.OK);
  },
);

export default router;
