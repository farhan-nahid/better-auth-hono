import { z } from "@hono/zod-openapi";

const SignInSchema = z.object({
  email: z.string(),
  password: z.string(),
  rememberMe: z.boolean().default(true),
  callbackURL: z.string().default("/dashboard"),
});

const SignUpSchema = z.object({
  email: z.string(),
  password: z.string(),
  name: z.string(),
  image: z.string().optional(),
});

const SignOutSchema = z.object({
  userId: z.string(),
});

const ForgetPasswordSchema = z.object({
  email: z.string(),
});

const ResetPasswordSchema = z.object({
  newPassword: z.string(),
  token: z.string(),
});

const VerifyEmailSchema = z.object({
  token: z.string(),
});

const VerifyEmailGetSchema = z.object({
  token: z.string(),
  redirectUrl: z.string(),
});

export { ForgetPasswordSchema, ResetPasswordSchema, SignInSchema, SignOutSchema, SignUpSchema, VerifyEmailGetSchema, VerifyEmailSchema };
