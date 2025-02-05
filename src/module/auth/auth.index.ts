import { createRouter } from "@/lib/create-app";

import * as handlers from "./auth.handlers";
import * as routes from "./auth.routes";

const router = createRouter()
  .openapi(routes.signUp, handlers.signUp)
  .openapi(routes.signIn, handlers.signIn)
  .openapi(routes.verifyEmail, handlers.verifyEmail)
  .openapi(routes.signInGoogle, handlers.signInGoogle)
  .openapi(routes.forgetPassword, handlers.forgetPassword)
  .openapi(routes.resetPassword, handlers.resetPassword)
  .openapi(routes.jwks, handlers.jwks);

export default router;
