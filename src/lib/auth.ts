import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { bearer, jwt, openAPI, twoFactor } from "better-auth/plugins";
// import { validator, ZodAdapter } from "validation-better-auth";

import env from "@/env";
import { prisma } from "@/lib/prisma-db";
// import { SignUpSchema } from "@/module/auth/auth.schema";
import { sendEmail } from "@/utils/send-email";

export const auth = betterAuth({
  appName: "better_auth_hono",
  baseURL: env.BETTER_AUTH_URL,
  basePath: "/api/v1/auth",
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  trustedOrigins: [env.FRONTEND_URL, env.BETTER_AUTH_URL],
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: true,
    minPasswordLength: 8,
    maxPasswordLength: 20,
    resetPasswordTokenExpiresIn: 86400, // 86400 seconds (1 day)
    sendResetPassword: async ({ user, token }) => {
      await sendEmail({
        to: user.email,
        subject: "Reset your password",
        html: `Your reset password token is: ${token}`,
      });
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, token }) => {
      const url = `${env.FRONTEND_URL}/verify-email?token=${token}&callbackURL=/dashboard`;

      await sendEmail({
        to: user.email,
        subject: "Verify your email",
        html: `Click this link to verify your email: <a href="${url}">Verify Your Email</a>`,
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
      redirectURI: `${env.BETTER_AUTH_URL}/api/v1/auth/callback/google`,
      mapProfileToUser: (profile) => {
        return {
          firstName: profile?.given_name,
          lastName: profile?.family_name,
        };
      },
    },
  },
  account: {
    accountLinking: {
      trustedProviders: ["google"],
    },
  },
  user: {
    additionalFields: {
      firstName: { type: "string", required: true },
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
    openAPI(),
    jwt(),
    bearer(),
    twoFactor(),
    // validator([
    //   { path: "/sign-up/email", adapter: ZodAdapter(SignUpSchema) },
    // ]),
  ],
});
