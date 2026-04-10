import nodemailer from 'nodemailer';
import { getEnvVar } from '../utils/getEnvVar.js';

const transporter = nodemailer.createTransport({
  host: getEnvVar('SMTP_HOST'),
  port: Number(getEnvVar('SMTP_PORT')),
  secure: false,
  auth: {
    user: getEnvVar('SMTP_USER'),
    pass: getEnvVar('SMTP_PASS'),
  },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  await transporter.sendMail({
    from: `"GitHub Notifier" <noreply@github-notifier.local>`,
    to,
    subject,
    html,
  });
};
