import nodemailer from 'nodemailer';

export const sendEmail = async (link: string, email: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'souravofficial.web@gmail.com',
      pass: 'nvkk qpux gzte nmjp',
    },
  });

  // send mail
  await transporter.sendMail({
    from: 'souravofficial.web@gmail.com',
    to: `${email}`,
    subject: 'Reset you password within 1 hour',
    text: 'Click the Link below to reset your password',
    html: link,
  });
};
