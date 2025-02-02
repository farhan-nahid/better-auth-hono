import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import prisma from "@/db";
import sendEmail from "@/nodemailer";

import env from "./env";

export const auth = betterAuth({
  appName: "better_auth_hono",
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
    minPasswordLength: 8,
    maxPasswordLength: 20,
    resetPasswordTokenExpiresIn: 60,
    sendResetPassword: async ({ user, token }) => {
      console.log(`Reset password token for ${user.email}: ${token}`);

      await sendEmail({
        to: user.email,
        subject: "Reset your password",
        text: `Your reset password token is: ${token}`,
      });
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, token, url }) => {
      const [, redirectUrl] = url.split("&callbackURL=");
      const URL = `${env.BETTER_AUTH_URL}/api/v1/auth/verify-email?token=${token}&redirectUrl=${redirectUrl}`;
      console.log(`Verification token for ${user.email}: ${URL}`);

      await sendEmail({
        to: user.email,
        subject: "Verify your email",
        text: `Click this link to verify your email: ${URL}`,
      });
    },
  },

});
