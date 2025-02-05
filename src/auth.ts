import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { bearer, jwt } from "better-auth/plugins";

import { prisma } from "@/lib/prisma-db";
import sendEmail from "@/nodemailer";

import env from "./env";

export const auth = betterAuth({
  appName: "better_auth_hono",
  baseURL: env.BETTER_AUTH_URL,
  basePath: "/api/v1/auth",
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  trustedOrigins: [env.FRONTEND_URL, env.BETTER_AUTH_URL],
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
    minPasswordLength: 8,
    maxPasswordLength: 20,
    resetPasswordTokenExpiresIn: 86400, // 86400 seconds (1 day)
    sendResetPassword: async ({ user, token }) => {
      await sendEmail({
        to: user.email,
        subject: "Reset your password",
        text: `Your reset password token is: ${token}`,
      });
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Verify your email",
        text: `Click this link to verify your email: ${url}`,
      });
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 86400, // 86400 seconds (1 day)
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  user: {
    additionalFields: {
      lastName: { type: "string", required: true },
      phoneNumber: { type: "string", required: true },
      companyName: { type: "string", required: true },
      companyAddress: { type: "string", required: true },
      country: { type: "string", required: true },
      avatar: { type: "string", required: true },
      role: { type: "string", required: true, defaultValue: "USER" },
    },
  },

  plugins: [
    jwt(),
    bearer(),
  ],
});
