jest.setTimeout(30000);
require('dotenv').config();

const mongoose = require('mongoose');
require('../database/users');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_URI);
