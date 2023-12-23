import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'mdshahinahmed605702@gmail.com',
      pass: 'lsjw hvqz disv kark',
    },
  });

  await transporter.sendMail({
    from: 'mdshahinahmed605702@gmail.com', // sender address
    to, // list of receivers
    subject: 'Change password!', // Subject line
    text: 'Reset your password within 10 minutes', // plain text body
    html, // html body
  });
};
