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
const HomeDirectory = os.platform() === 'win32' ? process.env.HOMEPATH : process.env.HOME;
const ServerStreamPath = path.join('\\\\?\\pipe', process.cwd(), 'ctl');
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
    'Last-Modified': Date.now(),
    'X-Sent': true,
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
// Automatically parse request body as form data
// Extended required to post nested objects
// BUT it annoyingly breaks Multer so we don't extend during Media routes
app.use(bodyParser.urlencoded({ extended: true }));

const developmentMode = app => {
  console.log('Development Mode Enabled.');
  // Development: HTTP Logger -> 'dev' -> Concise output colored by response status for development use
  app.use(morgan('dev'));

  // Untested GCS Logging
  app.all('/users/:userId/companies/:companyId/work/:workId/media/**/*', async (req, res, next) => {
    const gcsLogPath = path.join(process.cwd(), '..', 'logs', 'gcs_log.txt');
    await bucket
      .file('access_log')
      .createReadStream({
        start: 10000,
        end: 20000
      })
      .on('error', error => console.log(error))
      .pipe(fs.createWriteStream(gcsLogPath));
    next();
  });

  // SUDO MODE -- Enable to use API without Authenticating
  app.use('/api/sudo', sudoRoutes);
};

const productionMode = app => {
  console.log('Production Mode Enabled.');

  // Activate Google Cloud Trace and Debug when in production
  require('@google-cloud/trace-agent').start();
  require('@google-cloud/debug-agent').start();

  // Production: Resource Compression
  const compressor = compression({ flush: zlib.Z_PARTIAL_FLUSH });
  app.use(compressor);

  // Generic Production error handler
  app.use((error, req, res, next) => {
    console.error(error);
    // If our routes specified a specific response, then send that. Otherwise,
    // send a generic message so as not to leak anything.
    res.status(500).json(error.response || 'Looks like something broke...');
  });

  // Ping Route - no need to get DDoS'd
  app.get('/ping', (req, res) => {
    res.status(200).json({ ok: true });
  });

  // Fatal Stack Trace
  process.once('uncaughtException', error => {
    console.error('FATAL: Uncaught exception.');
    console.error(error.stack || error);
    setTimeout(() => process.exit(1), 100);
  });
};

process.env.NODE_ENV === 'production' ? productionMode(app) : developmentMode(app);

// Backend API Routes
app.use('/', apiRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', authenticateUser, authorizeUser, userRoutes);
app.use('/api/users/:userId/companies', authenticateUser, authorizeUser, companyRoutes);
app.use('/api/users/:userId/locations', authenticateUser, authorizeUser, locationRoutes);
app.use('/api/users/:userId/work', authenticateUser, authorizeUser, workRoutes);
app.use('/api/users/:userId/invoices', authenticateUser, authorizeUser, invoiceRoutes);

const server = http.createServer(app);
server.listen(PORT, IP, () => {
  console.log(`[${process.env.APP_NAME}]: Launched API on ${HOST}:${PORT}`);
  console.log(`[${process.env.APP_NAME}]: Assigned IP Address ${IP}`);
  console.log(`[${process.env.APP_NAME}]: Found Home Directory ${HomeDirectory}`);
  console.log(`[${process.env.APP_NAME}]: Stream Sync with Directory ${ServerStreamPath}`);
  console.log(`[${process.env.APP_NAME}]: Found Root Project Directory ${path.join(process.cwd(), '..')}`);
  console.log(`[${process.env.APP_NAME}]: Public URL is ${process.env.PUBLIC_URL}`);
});
