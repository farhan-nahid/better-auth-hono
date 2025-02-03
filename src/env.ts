import { config } from "dotenv";
import { expand } from "dotenv-expand";
import path from "node:path";
import { z } from "zod";

expand(
  config({
    path: path.resolve(
      process.cwd(),
      // eslint-disable-next-line node/no-process-env
      process.env.NODE_ENV === "test" ? ".env.test" : ".env",
    ),
  }),
);

const EnvSchema = z
  .object({
    NODE_ENV: z.string().default("development"),
    PORT: z.coerce.number().default(9999),
    BETTER_AUTH_SECRET: z.string(),
    SMTP_SERVICE: z.string(),
    SMTP_HOST: z.string(),
    SMTP_PORT: z.coerce.number(),
    SMTP_USER: z.string(),
    SMTP_PASSWORD: z.string(),
    BETTER_AUTH_URL: z.string().url(),
    FRONTEND_URL: z.string().url(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    DATABASE_URL: z.string().url(),
    LOG_LEVEL: z.enum([
      "fatal",
      "error",
      "warn",
      "info",
      "debug",
      "trace",
      "silent",
    ]),
  });

export type env = z.infer<typeof EnvSchema>;

// eslint-disable-next-line node/no-process-env, ts/no-redeclare
const { data: env, error } = EnvSchema.safeParse(process.env);

if (error) {
  console.error("❌ Invalid env:");
  console.error(JSON.stringify(error.flatten().fieldErrors, null, 2));
  process.exit(1);
}

export default env!;
