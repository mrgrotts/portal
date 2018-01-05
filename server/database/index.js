require('dotenv').load();
const mongoose = require('mongoose');
mongoose.set('debug', true);

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_URI, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});

// Get the default connection
let database = mongoose.connection;
// Bind connection to error event (to get notification of connection errors)
database.on('error', console.error.bind(console, `MongoDB connection error:`));

process.on('SIGINT', () => {
  console.log(`[${process.env.APP_NAME}]: SIGINT`);
  database.close();
  process.exit();
});

module.exports.User = require('./user');
module.exports.Ticket = require('./ticket');
