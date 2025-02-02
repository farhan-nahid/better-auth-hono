import { createRoute } from "@hono/zod-openapi";

import { httpStatusCodes } from "@/constants";
import { jsonContent, jsonContentRequired } from "@/openapi/helpers";
import { createMessageObjectSchema } from "@/openapi/schemas";

import { SignInSchema, SignOutSchema, SignUpSchema } from "./auth.schema";

const tags = ["Auth"];

const signIn = createRoute({
  tags,
  method: "post",
  path: "/auth/sign-in",
  summary: "Sign in",
  description: "Sign in to the application",
  request: {
    body: jsonContentRequired(SignInSchema, "Sign in"),
  },
  responses: {
    [httpStatusCodes.OK]: jsonContent(
      createMessageObjectSchema("Sign in successful"),
      "Sign in successful",
    ),
  },
});

const signUp = createRoute({
  tags,
  method: "post",
  path: "/auth/sign-up",
  summary: "Sign up",
  description: "Sign up to the application",
  request: {
    body: jsonContentRequired(SignUpSchema, "Sign up"),
  },
  responses: {
    [httpStatusCodes.OK]: jsonContent(
      createMessageObjectSchema("Sign up successful"),
      "Sign up successful",
    ),
  },

});

const signOut = createRoute({
  tags,
  method: "post",
  path: "/auth/sign-out",
  summary: "Sign out",
  description: "Sign out of the application",
  request: {
    body: jsonContentRequired(SignOutSchema, "Sign out"),
  },
  responses: {
    [httpStatusCodes.OK]: jsonContent(
      createMessageObjectSchema("Sign out successful"),
      "Sign out successful",
    ),
  },
});

export type SignInRoute = typeof signIn;
export type SignUpRoute = typeof signUp;
export type SignOutRoute = typeof signOut;

export { signIn, signOut, signUp };
