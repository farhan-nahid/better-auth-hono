import type { AppRouteHandler } from "@/lib/types";

import { auth } from "@/auth";

import type { ForgetPasswordRoute, JwksRoute, ResetPasswordRoute, SignInGoogleRoute, SignInRoute, SignUpRoute, TwoFactorEnableRoute, VerifyEmailRoute } from "./auth.routes";

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
  const token = "eyJhbGciOiJFZERTQSIsImtpZCI6IkFiaFdhdUlTY1Z3ZmlQdXZDc3BPaVRxczFSOHBZZVpuIn0.eyJpZCI6IkVCWGg2dnhkNjU4M3F2Z0NzRWhobnA5bEM3dUd6NWNkIiwibmFtZSI6IkpvaG4iLCJlbWFpbCI6ImpvaG4uZG9lMkBleGFtcGxlLmNvbSIsImVtYWlsVmVyaWZpZWQiOnRydWUsImltYWdlIjpudWxsLCJjcmVhdGVkQXQiOiIyMDI1LTAyLTA1VDA1OjExOjEyLjk0OVoiLCJ1cGRhdGVkQXQiOiIyMDI1LTAyLTA1VDA1OjExOjEyLjk0OVoiLCJ0d29GYWN0b3JFbmFibGVkIjpudWxsLCJsYXN0TmFtZSI6IkRvZSIsInBob25lTnVtYmVyIjoiKzEyMzQ1Njc4OTAiLCJjb21wYW55TmFtZSI6IkV4YW1wbGUgQ29ycCIsImNvbXBhbnlBZGRyZXNzIjoiMTIzIEV4YW1wbGUgU3QsIFNhbXBsZSBDaXR5LCBFWCAxMjM0NSIsImNvdW50cnkiOiJVU0EiLCJhdmF0YXIiOiJodHRwczovL2V4YW1wbGUuY29tL2F2YXRhcnMvam9obl9kb2UucG5nIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3Mzg3Mzg3MDEsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA5MCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA5MCIsImV4cCI6MTczODczOTYwMSwic3ViIjoiRUJYaDZ2eGQ2NTgzcXZnQ3NFaGhucDlsQzd1R3o1Y2QifQ.VA4bl7Nq09HxtXKcpsGB9g2oaU2gOCfet3e9lb0AYbEu1oWNEdS-jJoKAke_1LBod_U3lZKao5LY-0NBcITSDg";

  await auth.api.getTOTPURI({ body: { password }, headers: new Headers({ Authorization: `Bearer ${token}` }) });
  return c.json({ message: "Two factor enabled" });
};

const jwks: AppRouteHandler<JwksRoute> = async (c) => {
  const jwks = await auth.api.getJwks();
  return c.json(jwks);
};

export { forgetPassword, jwks, resetPassword, signIn, signInGoogle, signUp, twoFactorEnable, verifyEmail };
