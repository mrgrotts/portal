require('dotenv').config();
const http = require('http');
const path = require('path');
const fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const database = require('./database');
const { checkAdmin, authenticateUser, authorizeUser } = require('./middleware');

const sudoRoutes = require('./routes/sudo');
const apiRoutes = require('./routes/api');
const adminRoutes = require('./routes/admins');
const authRoutes = require('./routes/auth');
const locationRoutes = require('./routes/locations');
const ticketRoutes = require('./routes/tickets');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;
const IP = process.env.IP || '0.0.0.0';
const app = express();

// HTTP Logger -> 'dev' -> Concise output colored by response status for development use.
app.use(morgan('dev'));
// HTTP Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Cross Origin Resource Sharing (for JWT)
app.use(cors());

// SUDO MODE -- Enable to use API without Authenticating
app.use('/api/sudo', sudoRoutes);

app.use('/', apiRoutes);
app.use('/api/admin/:id', checkAdmin, adminRoutes);
app.use('/api/auth', authRoutes);
app.use(
  '/api/users/:id/locations',
  authenticateUser,
  authorizeUser,
  locationRoutes
);
app.use(
  '/api/users/:id/tickets',
  authenticateUser,
  authorizeUser,
  ticketRoutes
);

const server = http.createServer(app);
server.listen(PORT, IP, () => {
  console.log(`[${process.env.APP_NAME}]: Launched API on ${HOST}:${PORT}.`);
  console.log(`[${process.env.APP_NAME}]: Assigned IP Address ${IP}.`);
});
