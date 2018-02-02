const crypto = require('crypto');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const helpers = {
  encrypt: (key, data) => {
    const cipher = crypto.createCipher('aes-256-cbc', key);
    let crypted = cipher.update(data, 'utf-8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
  },

  decrypt: (key, data) => {
    const decipher = crypto.createDecipher('aes-256-cbc', key);
    let decrypted = decipher.update(data, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
  }
};

module.exports = {
  transporter: nodemailer.createTransport(
    smtpTransport({
      service: 'Gmail',
      auth: { user: 'rozalado@gmail.com', pass: 'Roscoe007' }
    })
  ),

  sendVerification: function(result, callback) {
    var mailOptions = {
      from: '<rozalado@gmail.com>',
      to: result.username,
      subject: 'Click the link to verify your email.',
      text:
        'https://app.rozaladocleaning.com/verifyregistration?id=' +
        result._id,
      html:
        '<a href="https://app.rozaladocleaning.com/verifyregistration?id=' +
        result._id +
        '">https://app.rozaladocleaning.com/verifyregistration?id=' +
        result._id +
        '</a>'
    };

    this.transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
        callback(0);
      } else {
        console.log('Message sent: ' + info.response);
        callback(1);
      }
    });
  },

  sendForgotPassword: function(result, callback) {
    var mailOptions = {
      from: '<rozalado@gmail.com>',
      to: result[0].username,
      subject: 'Your Password',
      text: helper.decrypt(process.env.JWT_KEY, result[0].password),
      html:
        '<b>' + helper.decrypt(process.env.JWT_KEY, result[0].password) + '</b>'
    };

    this.transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
        callback(0);
      }
      console.log('Message sent: ' + info.response);
      callback(1);
    });
  },

  sendStatusUpdate: function(result, status, callback) {
    var mailOptions = {
      from: '<rozalado@gmail.com>',
      to: result[0].user,
      subject: 'Your Ticket (' + result[0]._id + ') status has changed.',
      text:
        'Description: ' +
        result[0].description +
        ' ' +
        '\nLocation: ' +
        result[0].location +
        '\nStatus: ' +
        status,
      html:
        '<b>Description: ' +
        result[0].description +
        ' ' +
        '<br/>Location: ' +
        result[0].location +
        '<br/>Status: ' +
        status +
        '</b>'
    };

    this.transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
        callback(0);
      }
      console.log('Message sent: ' + info.response);
      callback(1);
    });
  }
};
