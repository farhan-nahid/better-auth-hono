import { z } from "zod";

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

export { SignInSchema, SignOutSchema, SignUpSchema };
