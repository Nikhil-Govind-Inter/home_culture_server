import nodemailer from 'nodemailer';
import config from '../config/index.js';

let transporter;
const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.port === 465,
      auth: config.smtp.user ? { user: config.smtp.user, pass: config.smtp.pass } : undefined,
    });
  }
  return transporter;
};

// Sends an email. With no SMTP_HOST in development, logs the message instead so flows can be tested.
export default async function sendMail({ to, subject, text, html }) {
  if (!config.smtp.host) {
    if (config.env === 'development') {
      console.log(`[mailer] SMTP not configured. To: ${to} | ${subject}\n${text}`);
      return;
    }
    throw new Error('SMTP is not configured');
  }
  await getTransporter().sendMail({ from: config.smtp.from, to, subject, text, html });
}
