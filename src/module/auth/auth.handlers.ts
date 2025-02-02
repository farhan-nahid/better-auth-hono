import type { AppRouteHandler } from "@/lib/types";

import { auth } from "@/auth";

import type { SignInRoute, SignUpRoute } from "./auth.routes";

const signIn: AppRouteHandler<SignInRoute> = async (c) => {
  const { email, password, rememberMe, callbackURL } = c.req.valid("json");
  const payload = { email, password, rememberMe, callbackURL };
  const user = await auth.api.signInEmail({ body: payload, asResponse: true });

  return c.json({ message: "Sign in successful", user });
};

const signUp: AppRouteHandler<SignUpRoute> = async (c) => {
  const { email, password, name, image } = c.req.valid("json");
  const user = await auth.api.signUpEmail({ body: { email, password, name, image }, asResponse: true });

  return c.json({ message: "Sign up successful", user });
};

// const signOut: AppRouteHandler<SignOutRoute> = async (c) => {
//   const { userId } = c.req.valid("json");
//   const ctx = c.req.ctx;
//   await auth.api.signOut(c);
//   return c.json({ message: "Sign out successful" });
// };

export { signIn, signUp };
