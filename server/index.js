require('dotenv').config();
const http = require('http');
const path = require('path');
const fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const database = require('./database');
const { authenticateUser, authorizeUser } = require('./middleware');

const apiRoutes = require('./routes/api');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const locationRoutes = require('./routes/locations');
const ticketRoutes = require('./routes/tickets');

const app = express();
const PORT = process.env.PORT || 8080;
const IP = process.env.IP || '0.0.0.0';

// Cross Origin Resource Sharing (for JWT)
app.use(cors());
// HTTP Logger -> 'dev' -> Concise output colored by response status for development use.
app.use(morgan('dev'));
// HTTP Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', apiRoutes);
app.use('/api', adminRoutes);
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
  console.log(`[${process.env.APP_NAME}]: Launched on port ${PORT}.`);
});
