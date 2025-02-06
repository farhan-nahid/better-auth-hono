import type { AppRouteHandler } from "@/lib/types";

import { auth } from "@/auth";

import type { ForgetPasswordRoute, GetSessionRoute, JwksRoute, ResetPasswordRoute, SignInGoogleRoute, SignInRoute, SignUpRoute, TwoFactorEnableRoute, VerifyEmailRoute } from "./auth.routes";

const signIn: AppRouteHandler<SignInRoute> = async (c) => {
  const { email, password, rememberMe, callbackURL } = c.req.valid("json");
  const payload = { email, password, rememberMe, callbackURL };
  const user = await auth.api.signInEmail({ body: payload });
  const session = await auth.api.getToken({ headers: new Headers({ Authorization: `Bearer ${user?.token}` }) });
  // c.res.setHeader("Set-Cookie", `token=${session?.token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${session?.expiresIn}`);
  return c.json({ message: "Sign in successful", token: session?.token });
};

const signInGoogle: AppRouteHandler<SignInGoogleRoute> = async (c) => {
  const data = await auth.api.signInSocial({
    body: {
      provider: "google",
      redirectURL: "http://localhost:3000/api/v1/auth/callback/google", // Redirect to home page after sign in
    },
  });
  return c.json({ message: "Sign in successful", user: data });
};

const signUp: AppRouteHandler<SignUpRoute> = async (c) => {
  const data = c.req.valid("json");
  await auth.api.signUpEmail({ body: { ...data } });

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
  const { token, callbackURL } = c.req.valid("query");
  const response = await auth.api.verifyEmail({ query: { token } });
  return c.json({ message: "Email verified", callbackURL, response });
};

const twoFactorEnable: AppRouteHandler<TwoFactorEnableRoute> = async (c) => {
  const { password } = c.req.valid("json");

  await auth.api.getTOTPURI({ body: { password } });
  return c.json({ message: "Two factor enabled" });
};

const jwks: AppRouteHandler<JwksRoute> = async (c) => {
  const jwks = await auth.api.getJwks();
  return c.json(jwks);
};

const getSession: AppRouteHandler<GetSessionRoute> = async (c) => {
  const headers = new Headers();
  const authorizationHeader = c.req.header("Authorization") || "";
  headers.append("Authorization", authorizationHeader);
  const sessions = await auth.api.getSession({ headers: c.req.raw.headers });
  return c.json(sessions);
};

export { forgetPassword, getSession, jwks, resetPassword, signIn, signInGoogle, signUp, twoFactorEnable, verifyEmail };
