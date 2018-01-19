require('dotenv').load();
const jwt = require('jsonwebtoken');
const database = require('../database');

const { ACCOUNT_NOT_AUTHORIZED, SESSION_TIMEOUT } = require('../constants');

exports.checkAdmin = (req, res, next) => {
  try {
    let admin = database.Admins.findById(req.params.id).then(admin => {
      if (admin) {
        next();
      } else {
        res.status(403).json({ message: `You're not an Admin.` });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: `You're not an Admin.` });
  }
};

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
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
      if (decoded && decoded.userId === req.params.id) {
        next();
      } else {
        res.status(403).json({ message: ACCOUNT_NOT_AUTHORIZED });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: ACCOUNT_NOT_AUTHORIZED });
  }
};
