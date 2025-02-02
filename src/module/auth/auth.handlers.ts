import type { AppRouteHandler } from "@/lib/types";

import { auth } from "@/auth";

import type { ForgetPasswordRoute, ResetPasswordRoute, SignInRoute, SignUpRoute, VerifyEmailGetRoute, VerifyEmailRoute } from "./auth.routes";

const signIn: AppRouteHandler<SignInRoute> = async (c) => {
  const { email, password, rememberMe, callbackURL } = c.req.valid("json");
  const payload = { email, password, rememberMe, callbackURL };
  const user = await auth.api.signInEmail({ body: payload });

  return c.json({ message: "Sign in successful", user: user?.user });
};

const signUp: AppRouteHandler<SignUpRoute> = async (c) => {
  const { email, password, name, image } = c.req.valid("json");
  await auth.api.signUpEmail({ body: { email, password, name, image }, asResponse: true });

  return c.json({ message: "Sign up successful" });
};

// const signOut: AppRouteHandler<SignOutRoute> = async (c) => {
//   const { userId } = c.req.valid("json");
//   const ctx = c.req.ctx;
//   await auth.api.signOut(c);
//   return c.json({ message: "Sign out successful" });
// };

const forgetPassword: AppRouteHandler<ForgetPasswordRoute> = async (c) => {
  const { email } = c.req.valid("json");
  await auth.api.forgetPassword({ body: { email, redirectTo: "/reset-password" } });
  return c.json({ message: "Email Sent" });
};

const resetPassword: AppRouteHandler<ResetPasswordRoute> = async (c) => {
  const { newPassword, token } = c.req.valid("json");
  await auth.api.resetPassword({ body: { newPassword, token } });
  return c.json({ message: "Reset password successful" });
};

const verifyEmail: AppRouteHandler<VerifyEmailRoute> = async (c) => {
  const { token } = c.req.valid("json");
  await auth.api.verifyEmail({ query: { token } });
  return c.json({ message: "Email verified" });
};

const verifyEmailGet: AppRouteHandler<VerifyEmailGetRoute> = async (c) => {
  const { token , redirectUrl} = c.req.valid("query");
  await auth.api.verifyEmail({ query: { token } });
  return c.json({ message: "Email verified", redirectUrl });
};

export { forgetPassword, resetPassword, signIn, signUp, verifyEmail, verifyEmailGet };
