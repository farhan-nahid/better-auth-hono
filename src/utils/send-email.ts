import type SMTPTransport from "nodemailer/lib/smtp-transport";

import { transporter } from "@/configs/nodemailer";
import env from "@/env";

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
