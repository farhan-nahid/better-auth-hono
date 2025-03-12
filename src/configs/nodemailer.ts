
import nodemailer from "nodemailer";

import env from "@/env";

export const transporter = nodemailer.createTransport({
  service: env.SMTP_SERVICE,
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: true, // use SSL
  auth: { user: env.SMTP_USER, pass: env.SMTP_PASSWORD },
});


