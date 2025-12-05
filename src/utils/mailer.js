import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true, 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
        rejectUnauthorized: false
    },
    family: 4 
});

export const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: `"CourseMaster" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });
  } catch (err) {
    console.error('Error sending email:', err);
    throw err;
  }
};
