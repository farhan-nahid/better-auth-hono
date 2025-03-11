import type SMTPTransport from "nodemailer/lib/smtp-transport";

import nodemailer from "nodemailer";

import env from "@/env";

const transporter = nodemailer.createTransport({
  service: env.SMTP_SERVICE,
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: true, // use SSL
  auth: { user: env.SMTP_USER, pass: env.SMTP_PASSWORD },
});

export async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  // eslint-disable-next-line no-console
  console.log(`Sending email to ${to} with subject: ${subject} and text: ${html}`);

  const emailOption: SMTPTransport.Options = {
    from: `"Better Auth" <${env.SMTP_USER}>`,
    to,
    subject,
    html,
  };

  await transporter.sendMail(emailOption);
}
