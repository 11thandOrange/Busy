
import nodemailer from 'nodemailer';

  export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "deepakaggarwalchicmic@gmail.com",
      pass: "bavyxsrfpoxoyzvj"
    }
  });