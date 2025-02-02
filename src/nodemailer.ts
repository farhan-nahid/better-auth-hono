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

async function sendEmail({ to, subject, text }: { to: string; subject: string; text: string }) {
  // eslint-disable-next-line no-console
  console.log(`Sending email to ${to} with subject: ${subject} and text: ${text}`);

  const emailOption: SMTPTransport.Options = {
    from: `"Better Auth" <${env.SMTP_USER}>`,
    to,
    subject,
    html: text,
  };

  await transporter.sendMail(emailOption);
}

export default sendEmail;
