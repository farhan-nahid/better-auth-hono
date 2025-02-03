import { createRoute } from "@hono/zod-openapi";

import { httpStatusCodes } from "@/constants";
import { jsonContent, jsonContentRequired } from "@/openapi/helpers";
import { createMessageObjectSchema } from "@/openapi/schemas";

import { ForgetPasswordSchema, ResetPasswordSchema, SignInSchema, SignOutSchema, SignUpSchema, VerifyEmailGetSchema, VerifyEmailSchema } from "./auth.schema";

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

const signInGoogle = createRoute({
  tags,
  method: "post",
  path: "/auth/sign-in-google",
  summary: "Sign in with Google",
  description: "Sign in with Google",
  request: {
    // body: jsonContentRequired(SignInSchema, "Sign in with Google"),
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

const resetPassword = createRoute({
  tags,
  method: "post",
  path: "/auth/reset-password",
  summary: "Reset password",
  description: "Reset password",
  request: {
    body: jsonContentRequired(ResetPasswordSchema, "Reset password"),
  },
  responses: {
    [httpStatusCodes.OK]: jsonContent(
      createMessageObjectSchema("Password reset successful"),
      "Password reset successful",
    ),
  },
});

const forgetPassword = createRoute({
  tags,
  method: "post",
  path: "/auth/forget-password",
  summary: "Forget password",
  description: "Forget password",
  request: {
    body: jsonContentRequired(ForgetPasswordSchema, "Forget password"),
  },
  responses: {
    [httpStatusCodes.OK]: jsonContent(
      createMessageObjectSchema("Email sent"),
      "Email sent",
    ),
  },
});

const verifyEmail = createRoute({
  tags,
  method: "post",
  path: "/auth/verify-email",
  summary: "Verify email",
  description: "Verify email",
  request: {
    body: jsonContentRequired(VerifyEmailSchema, "Verify email"),
  },
  responses: {
    [httpStatusCodes.OK]: jsonContent(
      createMessageObjectSchema("Email verified"),
      "Email verified",
    ),
  },
});

const verifyEmailGet = createRoute({
  tags,
  method: "get",
  path: "/auth/verify-email",
  summary: "Verify email",
  description: "Verify email",
  request: {
    query: VerifyEmailGetSchema,
  },
  responses: {
    [httpStatusCodes.OK]: jsonContent(
      createMessageObjectSchema("Email verified"),
      "Email verified",
    ),
  },
});

type SignInRoute = typeof signIn;
type SignUpRoute = typeof signUp;
type SignOutRoute = typeof signOut;
type VerifyEmailRoute = typeof verifyEmail;
type SignInGoogleRoute = typeof signInGoogle;
type ResetPasswordRoute = typeof resetPassword;
type ForgetPasswordRoute = typeof forgetPassword;
type VerifyEmailGetRoute = typeof verifyEmailGet;

export type { ForgetPasswordRoute, ResetPasswordRoute, SignInGoogleRoute, SignInRoute, SignOutRoute, SignUpRoute, VerifyEmailGetRoute, VerifyEmailRoute };

  export { forgetPassword, resetPassword, signIn, signInGoogle, signOut, signUp, verifyEmail, verifyEmailGet };

