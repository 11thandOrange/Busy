
import nodemailer from 'nodemailer';

  export const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "3fb2c78e3a0b1e",
      pass: "2cc7ba365b4514"
    }
  });