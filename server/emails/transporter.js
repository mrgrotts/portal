// require("dotenv").load();
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

module.exports.transporter = nodemailer.createTransport(
  smtpTransport({
    service: 'Gmail',
    auth: { user: 'rozalado@gmail.com', pass: 'Roscoe007' }
  })
);

// module.exports.transporter = nodemailer.createTransport(
//   smtpTransport({
//     service: "Gmail",
//     auth: { user: process.env.ADMIN_EMAIL, pass: process.env.ADMIN_PASSWORD }
//   })
// );
