const transporter = require("./transporter");

module.exports = {
  sendStatusUpdate: function(result, status, callback) {
    const mailOptions = {
      from: "<rozalado@gmail.com>",
      to: result[0].user,
      subject: `Ticket ${result[0]._id} Has Been Updated.`,
      text: `
      Description: ${result[0].description} \n
      Location: ${result[0].location} \n
      Status: ${result[0].status} 
      `,
      html: `
      <strong>Description:</strong> ${result[0].description} \n
      <strong>Location:</strong> ${result[0].location} \n
      <strong>Status:</strong> ${result[0].status} 
      `
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
        callback(0);
      }
      console.log(`Message sent: ${info.response}`);
      callback(1);
    });
  }
};
