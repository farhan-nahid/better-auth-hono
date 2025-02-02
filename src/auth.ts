import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import prisma from "@/db";
import sendEmail from "@/nodemailer";

import env from "./env";

export const auth = betterAuth({
  appName: "better_auth_hono",
  baseURL: env.BETTER_AUTH_URL,
  basePath: "/api/v1/auth",
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
    minPasswordLength: 8,
    maxPasswordLength: 20,
    resetPasswordTokenExpiresIn: 60,
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
  },

});
