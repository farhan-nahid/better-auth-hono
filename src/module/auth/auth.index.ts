import { createRouter } from "@/lib/create-app";

import * as handlers from "./auth.handlers";
import * as routes from "./auth.routes";

const router = createRouter()
  .openapi(routes.signIn, handlers.signIn)
  .openapi(routes.signUp, handlers.signUp)
  // .openapi(routes.update, handlers.update)
  // .openapi(routes.deleted, handlers.deleted);

export default router;
