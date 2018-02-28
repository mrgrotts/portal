// 'use strict';
require('dotenv').config();
const dns = require('dns');
const http = require('http');
const fs = require('fs');
const os = require('os');
const path = require('path');
const net = require('net');
const url = require('url');
const zlib = require('zlib');

const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const uuidv5 = require('uuid/v5');

const database = require('./database');
const { authenticateUser, authorizeUser } = require('./middleware');

const sudoRoutes = require('./routes/sudo');
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const companyRoutes = require('./routes/companies');
const locationRoutes = require('./routes/locations');
const workRoutes = require('./routes/work');
const invoiceRoutes = require('./routes/invoices');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;
const IP = process.env.IP || '127.0.0.1';
const homedir = os.platform() === 'win32' ? process.env.HOMEPATH : process.env.HOME;
const serverStreamPath = os.platform() === 'win32' ? `\\\\.\\pipe\\rozalado${Date.now()}.sock` : 'tmp.sock';
const app = express();

app.title = process.env.APP_NAME;
app.domain = process.env.APP_DOMAIN;
app.email = process.env.ADMIN_EMAIL;

// HTTP Response Headers
app.disable('x-powered-by');
app.use(helmet());
app.all('*', (req, res, next) => {
  req.requestId = uuidv5(app.domain, uuidv5.DNS);

  let responseHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'max-age=0, private, must-revalidate',
    // "Last-Modified": true,
    // "X-Sent": true,
    'X-Request-ID': req.requestId,
    'X-UA-Compatible': 'IE=edge'
  };

  for (let header in responseHeaders) {
    res.header(header, responseHeaders[header]);
  }

  next();
});
// Cross Origin Resource Sharing (for JWT)
app.use(cors());
// HTTP Body Parser with CSP Reporting
app.use(bodyParser.json({ type: ['json', 'application/csp-report'] }));
app.use(bodyParser.urlencoded({ extended: true }));
// Production: Resource Compression
// Development: HTTP Logger -> 'dev' -> Concise output colored by response status for development use
const compressor = compression({
  flush: zlib.Z_PARTIAL_FLUSH
});

process.env.NODE_ENV === 'production' ? app.use(compressor) : app.use(morgan('dev'));

// SUDO MODE -- Enable to use API without Authenticating
app.use('/api/sudo', sudoRoutes);

// Production Routes
app.use('/', apiRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', authenticateUser, authorizeUser, userRoutes);
app.use('/api/users/:userId/companies', authenticateUser, authorizeUser, companyRoutes);
app.use('/api/users/:userId/locations', authenticateUser, authorizeUser, locationRoutes);
app.use('/api/users/:userId/work', authenticateUser, authorizeUser, workRoutes);
app.use('/api/users/:userId/invoices', authenticateUser, authorizeUser, invoiceRoutes);

app.get('/ping', (req, res) => {
  res.status(200).json({ ok: true });
});

const server = http.createServer(app);
server.listen(PORT, IP, () => {
  console.log(`[${process.env.APP_NAME}]: Launched API on ${HOST}:${PORT}`);
  console.log(`[${process.env.APP_NAME}]: Assigned IP Address ${IP}`);
  console.log(`[${process.env.APP_NAME}]: Found Home Directory ${homedir}`);
  console.log(`[${process.env.APP_NAME}]: Stream Sync with Directory ${serverStreamPath}`);
});

if (process.env.NODE_ENV !== 'production') {
  process.once('uncaughtException', function(error) {
    console.error('FATAL: Uncaught exception.');
    console.error(error.stack || error);
    setTimeout(function() {
      process.exit(1);
    }, 100);
  });
}
