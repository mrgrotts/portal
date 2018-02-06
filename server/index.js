require('dotenv').config();
const http = require('http');
const path = require('path');
const fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const uuidv5 = require('uuid/v5');

const database = require('./database');
const { checkAdmin, authenticateUser, authorizeUser } = require('./middleware');

const sudoRoutes = require('./routes/sudo');
const apiRoutes = require('./routes/api');
const adminRoutes = require('./routes/admins');
const authRoutes = require('./routes/auth');
const customerRoutes = require('./routes/customers');
const locationRoutes = require('./routes/locations');
const ticketRoutes = require('./routes/tickets');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;
const IP = process.env.IP || '0.0.0.0';
const app = express();

app.title = process.env.APP_NAME;
app.domain = process.env.APP_DOMAIN;
app.email = process.env.ADMIN_EMAIL;
app.disable('x-powered-by');
// delete app.settings['x-powered-by'];

// HTTP Logger -> 'dev' -> Concise output colored by response status for development use.
app.use(morgan('dev'));
// HTTP Body Parser with CSP Reporting
app.use(
  bodyParser.json({
    type: ['json', 'application/csp-report']
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
// Cross Origin Resource Sharing (for JWT)
app.use(cors());
// HTTP Response Headers
app.use(helmet());

app.use((req, res, next) => {
  req.requestId = uuidv5(app.domain, uuidv5.DNS);
  // res.title = app.title;
  // res.domain = app.domain;
  // res.email = app.email;

  // console.log(req.hostname);

  let responseHeaders = {
    'Cache-Control': 'max-age=0, private, must-revalidate',
    'Last-Modified': true,
    'X-Sent': true,
    'X-Request-ID': req.requestId,
    'X-UA-Compatible': 'IE=edge'
  };

  for (let header in responseHeaders) {
    res.header(header, responseHeaders[header]);
  }

  next();
});

// Resource Compression
app.use(compression());

// SUDO MODE -- Enable to use API without Authenticating
app.use('/api/sudo', sudoRoutes);

app.use('/', apiRoutes);
app.use('/api/admin/:id', checkAdmin, adminRoutes);
app.use('/api/auth', authRoutes);
app.use(
  '/api/customers/:customerId',
  authenticateUser,
  authorizeUser,
  customerRoutes
);
app.use(
  '/api/users/:userId/locations',
  authenticateUser,
  authorizeUser,
  locationRoutes
);
app.use(
  '/api/users/:userId/tickets',
  authenticateUser,
  authorizeUser,
  ticketRoutes
);

const server = http.createServer(app);
server.listen(PORT, IP, () => {
  console.log(`[${process.env.APP_NAME}]: Launched API on ${HOST}:${PORT}`);
  console.log(`[${process.env.APP_NAME}]: Assigned IP Address ${IP}`);
});

// console.log(app);
