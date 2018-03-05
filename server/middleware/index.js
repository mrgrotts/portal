require('dotenv').load();
const jwt = require('jsonwebtoken');

const database = require('../database');
const { ACCOUNT_NOT_AUTHORIZED, ACCOUNT_NOT_VERIFIED, SESSION_TIMEOUT } = require('../constants');

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

exports.isVerified = async (req, res, next) => {
  try {
    await database.Users.findOne({ email: req.body.email }).then(user => {
      if (user.verified) {
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({ error, message: ACCOUNT_NOT_VERIFIED });
  }
};

// const multer = require('multer');

// exports.multer = async (req, res, next) => {
//   // Accept Image Files Only
//   const fileFilter = (req, file, callback) => {
//     if (!files[f].originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//       return callback(new Error('Only Image files are allowed.'), false);
//     }
//     callback(null, true);
//   };
//   // Multer parses Multipart Form Data off of req.files
//   const m = multer({
//     storage: multer.memoryStorage(),
//     limits: {
//       fileSize: 10 * 1024 * 1024 // no larger than 10mb
//     },
//     fileFilter
//   });

//   m.any();
//   next();
// };
