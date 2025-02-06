import { createRoute, z } from "@hono/zod-openapi";

import { httpStatusCodes } from "@/constants";
import { jsonContent, jsonContentRequired } from "@/openapi/helpers";
import { createMessageObjectSchema } from "@/openapi/schemas";

import { ForgetPasswordSchema, ResetPasswordSchema, SignInSchema, SignOutSchema, SignUpSchema, TwoFactorEnableSchema, VerifyEmailSchema } from "./auth.schema";

const tags = ["Auth"];

const signIn = createRoute({
  tags,
  method: "post",
  path: "/auth/sign-in/email",
  summary: "Sign in",
  description: "Sign in to the application",
  request: {
    body: {
      description: "Sign in to the application",
      content: {
        "application/json": {
          schema: SignInSchema,
        },
      },
    },
  },
  responses: {
    [httpStatusCodes.OK]: {
      description: "Sign in successful",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            token: z.string(),
          }),
        },
      },
    },
  },
});

const signInGoogle = createRoute({
  tags,
  method: "post",
  path: "/auth/sign-in/google",
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
  path: "/auth/sign-up/email",
  summary: "Sign up",
  description: "Sign up to the application",
  request: {
    body: {
      description: "Sign up to the application",
      content: {
        "application/json": {
          schema: SignUpSchema,
        },
      },
    },
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
  method: "get",
  path: "/auth/verify-email",
  summary: "Verify email",
  description: "Verify email",
  request: {
    query: VerifyEmailSchema,
  },
  responses: {
    [httpStatusCodes.OK]: jsonContent(
      createMessageObjectSchema("Email verified"),
      "Email verified",
    ),
  },
});

const twoFactorEnable = createRoute({
  tags,
  method: "post",
  path: "/auth/two-factor/enable",
  summary: "Enable two factor",
  description: "Enable two factor",
  request: {
    // headers: z.object({
    //   Authorization: z.string().describe("Bearer token"),
    // }),
    body: {
      description: "Enable two factor",
      content: {
        "application/json": {
          schema: TwoFactorEnableSchema,
        },
      },
    },
  },
  responses: {
    [httpStatusCodes.OK]: {
      description: "Two factor enabled",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
  },
});

const jwks = createRoute({
  tags,
  method: "get",
  path: "/auth/jwks",
  summary: "Get JWKS",
  description: "Get JWKS",
  responses: {
    [httpStatusCodes.OK]: jsonContent(
      z.object({
        keys: z.array(
          z.object({
            crv: z.string(),
            x: z.string(),
            kty: z.string(),
            kid: z.string(),
          }),
        ),
      }),
      "JWKS",
    ),
  },
});

const getSession = createRoute({
  tags,
  method: "get",
  path: "/auth/get-session",
  summary: "Get session",
  description: "Get session",
  responses: {
    [httpStatusCodes.OK]: jsonContent(
      z.object({
        session: z.object({
          token: z.string(),
          expiresIn: z.number(),
        }),
        user: z.object({
          id: z.string(),
          email: z.string(),
          firstName: z.string(),
          lastName: z.string(),
        }),
      }),
      "Session",
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
type JwksRoute = typeof jwks;
type TwoFactorEnableRoute = typeof twoFactorEnable;
type GetSessionRoute = typeof getSession;

export type { ForgetPasswordRoute, GetSessionRoute, JwksRoute, ResetPasswordRoute, SignInGoogleRoute, SignInRoute, SignOutRoute, SignUpRoute, TwoFactorEnableRoute, VerifyEmailRoute };

  export { forgetPassword, getSession, jwks, resetPassword, signIn, signInGoogle, signOut, signUp, twoFactorEnable, verifyEmail };

