import { promises as fs } from 'fs';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(toEmail, subject, variables = {}) {
  try {
    const emailTemplate = await fs.readFile(new URL('./templates/emailTemplate.html', import.meta.url), 'utf8');

    const emailHtml = Object.keys(variables).reduce(
      (template, key) => template.replace(new RegExp(`{{${key}}}`, 'g'), variables[key]),
      emailTemplate
    );

    const response = await resend.emails.send({
      to: toEmail,
      from: 'forezjuli08@hotmail.com',
      subject: subject,
      html: emailHtml,
    });

    console.log('Email sent:', response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}
