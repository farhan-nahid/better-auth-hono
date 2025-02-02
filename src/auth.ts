import {
  betterAuth,
} from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import prisma from "@/db";

export const auth = betterAuth({
  appName: "better_auth_nextjs",
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
    minPasswordLength: 8,
    maxPasswordLength: 20,
    resetPasswordTokenExpiresIn: 60,
    sendResetPassword: async ({ user, token }: { user: { email: string }; token: string }) => {
      console.log("Sending email to:", user.email);
      console.log("Reset password token:", token);
    // await sendEmail({
    //   to: user.email,
    //   subject: "Reset your password",
    //   text: `Click the link to reset your password: ${url}`,
    // });
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, token }) => {
      console.log("Sending email to:", user.email);
      console.log("Verification token:", token);
    },
  },

});
