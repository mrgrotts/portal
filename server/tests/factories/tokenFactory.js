require('dotenv').load();
const jwt = require('jsonwebtoken');

module.exports = user => jwt.sign({ userId: user._id }, process.env.JWT_KEY, { expiresIn: 60 * 60 });
