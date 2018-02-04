const jwt = require("jsonwebtoken");
const database = require("../database");
const emails = require("../emails/emails.js");

const {
  INVALID_EMAIL,
  INVALID_PASSWORD,
  ACCOUNT_NOT_VERIFIED,
  VERIFICATION_SUCCESS,
  VERIFICATION_FAILED
} = require("../constants");

exports.login = (req, res) => {
  database.Users.findOne({
    email: req.body.email
  })
    .then(user => {
      if (user.verified) {
        user.comparePassword(req.body.password, (error, match) => {
          if (match) {
            const expiresIn = 60 * 60;
            const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
              expiresIn
            });
            res.status(200).json({
              userId: user._id,
              profilePicture: user.profilePicture,
              token,
              expiresIn
            });
          } else {
            // email/password did not match db
            console.log("invalid password");
            res.status(400).json({
              message: INVALID_PASSWORD
            });
          }
        });
      } else {
        console.log("account not verified");
        res.status(400).json({
          message: ACCOUNT_NOT_VERIFIED
        });
      }
    })
    .catch(error => {
      // could not find email in db
      console.log("invalid email");
      res.status(400).json({
        message: INVALID_EMAIL
      });
    });
};

exports.register = (req, res) => {
  database.Users.create(req.body)
    .then(user => {
      const token = jwt.sign(
        {
          userId: user._id
        },
        process.env.JWT_KEY
      );
      // console.log(JSON.stringify(user));
      emails.sendVerification(
        { _id: user._id, username: user.email },
        event => {
          if (event) {
            res.status(200).json({
              userId: user._id,
              token
            });
          } else {
            res.status(400);
          }
        }
      );
    })
    .catch(error => {
      console.log(error);
      res.status(400).json({ message: error });
    });
};

exports.verifyRegistration = (req, res) => {
  console.log("verifying user");
  database.Users.findByIdAndUpdate(req.params.userId, { verified: true })
    .then(user => res.status(200).json({ message: VERIFICATION_SUCCESS }))
    .catch(error => {
      console.log(error);
      res.status(404).json(error);
    });
};

exports.forgotPassword = (req, res) => {
  database.Users.find({
    email: req.body.email
  })
    .then(user => {
      console.log(user);
      // send password reset email
    })
    .catch(error => {
      console.log(error);
      res.status(404).json({ message: error });
    });
};

module.exports = exports;
