const transporter = require('./transporter');

const crypto = require('crypto');

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
  sendVerification: function(result, callback) {
    console.log(result);
    const mailOptions = {
      from: '<rozalado@gmail.com>',
      to: result.username,
      subject: 'Click the link to verify your email.',
      text: `http://localhost:8080/api/auth/${result._id}/verify`,
      html: `<a href=http://localhost:8080/api/auth/${result._id}/verify>
      http://localhost:8080/api/auth/${result._id}/verify</a>`
    };

    this.transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
        callback(0);
      } else {
        console.log(`Message sent: ${info.response}`);
        callback(1);
      }
    });
  },

  sendForgotPassword: function(result, callback) {
    const mailOptions = {
      from: '<rozalado@gmail.com>',
      to: result.username,
      subject: 'Your Password Reset Link',
      text: `${result.tmpPassword}`,
      html: `${result.tmpPassword}`
    };

    this.transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
        callback(0);
      }
      console.log(`Message sent: ${info.response}`);
      callback(1);
    });
  }
};
