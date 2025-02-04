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
  lastName: z.string(),
  avatar: z.string(),
  phoneNumber: z.string(),
  companyName: z.string(),
  companyAddress: z.string(),
  country: z.string(),
  role: z.enum(["USER", "ADMIN"]).default("USER"),

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
  callbackURL: z.string(),
});

export { ForgetPasswordSchema, ResetPasswordSchema, SignInSchema, SignOutSchema, SignUpSchema, VerifyEmailSchema };
