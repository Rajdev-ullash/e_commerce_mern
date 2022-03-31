const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE), // true for 465, false for other ports
      auth: {
        user: process.env.USER, // generated ethereal user
        pass: process.env.PASS, // generated ethereal password
      },
    });
    await transporter.sendMail({
      from: process.env.USER, // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      text: text, // plain text body
      //   html: "<b>Hello world?</b>", // html body
    });
    console.log("Email sent successfully");
  } catch (error) {
    res.status(500).json({ message: "Email not send", error: error });
  }
};
