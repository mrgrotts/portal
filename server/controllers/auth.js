const jwt = require("jsonwebtoken");
const database = require("../database");
const emails = require("../emails");

const {
  INVALID_EMAIL,
  INVALID_PASSWORD,
  ACCOUNT_NOT_VERIFIED,
  FORGOT_PASSWORD_FAILED,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
  VERIFICATION_SUCCESS,
  VERIFICATION_FAILED
} = require("../constants");

exports.login = (req, res) =>
  database.Users.findOne({
    email: req.body.email
  })
    .populate("company")
    .populate("locations")
    .populate("tickets")
    .then(user => {
      // console.log("[LOGIN]", user);
      if (user.verified) {
        user.comparePassword(req.body.password, (error, match) => {
          if (match) {
            const expiresIn = 60 * 60;
            const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
              expiresIn
            });

            return res.json({
              user,
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
        error,
        message: INVALID_EMAIL
      });
    });

exports.register = (req, res) =>
  database.Users.create(req.body)
    .then(user => {
      const expiresIn = 60 * 60;
      const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
        expiresIn
      });
      // console.log(JSON.stringify(user));
      emails.sendVerification(
        { _id: user._id, username: user.email },
        event => {
          if (event) {
            res.json({
              user,
              token,
              expiresIn,
              message: REGISTRATION_SUCCESS
            });
          } else {
            res.status(400).json({ message: VERIFICATION_FAILED });
          }
        }
      );
    })
    .catch(error =>
      res.status(400).json({ error, message: REGISTRATION_FAILED })
    );

exports.verifyRegistration = (req, res) =>
  database.Users.findByIdAndUpdate(
    req.params.userId,
    { verified: true },
    { new: true }
  )
    .populate("user")
    .then(user => res.status(200).json({ user, message: VERIFICATION_SUCCESS }))
    .catch(error =>
      res.status(404).json({ error, message: VERIFICATION_FAILED })
    );

exports.forgotPassword = (req, res) => {
  let temporaryPassword = parseInt(Math.random() * 1000000000);

  database.Users.findByIdAndUpdate(req.params.userId, {
    password: temporaryPassword
  })
    .then(user => {
      emails.sendForgotPassword(
        { username: user.email, temporaryPassword },
        event => {
          if (event) {
            res.status(200).json({
              userId: user._id
            }); //send back something
          } else {
            res.status(400);
          }
        }
      );
    })
    .catch(error =>
      res.status(404).json({ error, message: FORGOT_PASSWORD_FAILED })
    );
};

module.exports = exports;
