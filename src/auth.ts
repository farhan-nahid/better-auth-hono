import {
  betterAuth,
} from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import prisma from "@/db";

export const auth = betterAuth({
  appName: "better_auth_nextjs",
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: { enabled: true, autoSignIn: false, requireEmailVerification: true },
});
