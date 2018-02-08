require('dotenv').load();
const jwt = require('jsonwebtoken');

const database = require('../database');
const {
  ACCOUNT_NOT_AUTHORIZED,
  ACCOUNT_NOT_VERIFIED,
  SESSION_TIMEOUT
} = require('../constants');

exports.authenticateUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (decoded) {
        next();
      } else {
        res.status(401).json({ message: SESSION_TIMEOUT });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: SESSION_TIMEOUT });
  }
};

exports.authorizeUser = (req, res, next) => {
  req.user = req.params.userId;

  if (req.user === undefined) {
    // req.user = req.url.slice(1);
    req.user = req.url.split('/')[1];
    // console.log("[USER FROM AUTHORIZEUSER]", req.user);
  }

  database.Users.findById(req.user)
    .populate('company')
    .populate('locations')
    .populate('work')
    .then(user => {
      req.user = user;
      // console.log("[USER FOUND]", user);
    })
    .catch(next);

  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
      if (decoded && decoded.userId === req.user) {
        next();
      } else {
        res.status(403).json({ message: ACCOUNT_NOT_AUTHORIZED });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({ error, message: ACCOUNT_NOT_AUTHORIZED });
  }
};

exports.isVerified = (req, res, next) => {
  try {
    database.Users.findOne({ email: req.body.email }).then(user => {
      if (user.verified) {
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({ error, message: ACCOUNT_NOT_VERIFIED });
  }
};
