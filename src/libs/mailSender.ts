const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "admin@wepardo.services",
    pass: "Wepardos2024$$",
  },
});

// async..await is not allowed in global scope, must use a wrapper
export async function emailSender(email: string, name: string, code: string) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"El equipo de Wepardo"', // sender address
    to: `${email}`, // list of receivers
    subject: "Tu código de recuperación para Wepardo", // Subject line
    text: `${code}`, // plain text body
    html: `<b>${code}</b>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}
