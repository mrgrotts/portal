const jwt = require('jsonwebtoken');
const database = require('../database');

const { INVALID_EMAIL, INVALID_PASSWORD } = require('../constants');

exports.login = (req, res) => {
  database.Users.findOne({
    email: req.body.email
  })
    .then(user => {
      user.comparePassword(req.body.password, (error, match) => {
        if (match) {
          const expiresIn = 60 * 60;
          const token = jwt.sign(
            {
              userId: user._id
            },
            process.env.JWT_KEY,
            {
              expiresIn
            }
          );
          res.status(200).json({
            userId: user._id,
            profilePicture: user.profilePicture,
            token,
            expiresIn
          });
        } else {
          // email/password did not match db
          res.status(400).json({
            message: INVALID_PASSWORD
          });
        }
      });
    })
    .catch(error => {
      // could not find email in db
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
      res.status(200).json({
        userId: user._id,
        token
      });
    })
    .catch(error => {
      res.status(400).json(error);
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
      res.status(404).json(error);
    });
};

module.exports = exports;
