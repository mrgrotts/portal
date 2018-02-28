'use strict';
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
const homedir =
  os.platform() === 'win32' ? process.env.HOMEPATH : process.env.HOME;
const serverStreamPath =
  os.platform() === 'win32'
    ? `\\\\.\\pipe\\rozalado${Date.now()}.sock`
    : 'tmp.sock';

function findIndex(arr, func) {
  for (let i = 0; i < arr.length; i++) {
    if (func(arr[i], i, arr)) return i;
  }
  return -1;
}

class Server {
  constructor(host = HOST, port = PORT, ip = IP) {
    this.app = express();
    this.messages = [];
    this.sockets = [];
    this.serverUp = false;
    this.appServerUp = false;
    this.host = host;
    this.port = port;
    this.ip = ip;
    this.connections = [];

    this.appServer = http.createServer(this.app);
    this.exposedServer = net.createServer();

    this.wss = new WebSocketServer({
      server: this.appServer,
      path: '/updates'
    });

    this.exposedServer.on('connection', socket =>
      this.onServerConnection(socket)
    );
    this.wss.on('connection', ws => this.onWsConnection(ws));

    this.app.title = process.env.APP_NAME;
    this.app.domain = process.env.APP_DOMAIN;
    this.app.email = process.env.ADMIN_EMAIL;

    // HTTP Response Headers
    this.app.disable('x-powered-by');
    this.app.use(helmet());
    this.app.all('*', (req, res, next) => {
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
    this.app.use(cors());
    // HTTP Body Parser with CSP Reporting
    this.app.use(
      bodyParser.json({
        type: ['json', 'application/csp-report']
      })
    );
    this.app.use(bodyParser.urlencoded({ extended: true }));
    // Production: Resource Compression
    // Development: HTTP Logger -> 'dev' -> Concise output colored by response status for development use
    process.env.NODEENV === 'production'
      ? this.app.use(compressor)
      : this.app.use(morgan('dev'));

    // SUDO MODE -- Enable to use API without Authenticating
    this.app.use('/api/sudo', sudoRoutes);

    // Production Routes
    this.app.use('/', apiRoutes);
    this.app.use('/api/auth', authRoutes);
    this.app.use('/api/users', authenticateUser, authorizeUser, userRoutes);
    this.app.use(
      '/api/users/:userId/companies',
      authenticateUser,
      authorizeUser,
      companyRoutes
    );
    this.app.use(
      '/api/users/:userId/locations',
      authenticateUser,
      authorizeUser,
      locationRoutes
    );
    this.app.use(
      '/api/users/:userId/work',
      authenticateUser,
      authorizeUser,
      workRoutes
    );
    this.app.use(
      '/api/users/:userId/invoices',
      authenticateUser,
      authorizeUser,
      invoiceRoutes
    );

    this.app.get('/ping', (req, res) => res.status(200).json({ ok: true }));
  }

  generateDelayedMessages() {
    setTimeout(() => {
      this.addMessage();
      this.generateDelayedMessages();
    }, random(5000, 15000));
  }

  broadcast(obj) {
    const msg = JSON.stringify(obj);
    this.sockets.forEach(socket => {
      socket.send(msg, err => {
        if (err) console.error(err);
      });
    });
  }

  onServerConnection(socket) {
    let closed = false;
    this.connections.push(socket);

    socket.on('close', () => {
      closed = true;
      this.connections.splice(this.connections.indexOf(socket), 1);
    });

    socket.on('error', err => console.log(err));

    const connection = connectionProperties[this.connectionType];
    const makeConnection = () => {
      if (closed) return;
      const appSocket = net.connect(appServerPath);
      appSocket.on('error', err => console.log(err));
      socket.pipe(new Throttle(connection.bps)).pipe(appSocket);
      appSocket.pipe(new Throttle(connection.bps)).pipe(socket);
    };

    if (connection.delay) {
      setTimeout(makeConnection, connection.delay);
      return;
    }
    makeConnection();
  }

  onWsConnection(socket) {
    const requestUrl = url.parse(socket.upgradeReq.url, true);

    if ('no-socket' in requestUrl.query) return;

    this.sockets.push(socket);

    socket.on('close', () => {
      this.sockets.splice(this.sockets.indexOf(socket), 1);
    });

    let sendNow = [];

    if (requestUrl.query.since) {
      const sinceDate = new Date(Number(requestUrl.query.since));
      let missedMessages = findIndex(
        this.messages,
        msg => new Date(msg.time) <= sinceDate
      );
      if (missedMessages == -1) missedMessages = this.messages.length;
      sendNow = this.messages.slice(0, missedMessages);
    } else {
      sendNow = this.messages.slice();
    }

    if (sendNow.length) {
      socket.send(JSON.stringify(sendNow));
    }
  }

  addMessage() {
    const message = generateMessage();
    this.messages.unshift(message);
    this.messages.pop();
    this.broadcast([message]);
  }

  listen() {
    this.serverUp = true;
    this.exposedServer.listen(this.port, this.ip, () => {
      console.log(
        `[${this.app.title}]: Launched API on ${this.host}:${this.port}`
      );
      console.log(`[${process.env.APPNAME}]: Assigned IP Address ${this.ip}`);
      console.log(`[${process.env.APPNAME}]: Found Home Directory ${homedir}`);
      console.log(
        `[${
          process.env.APPNAME
        }]: Stream Sync with Directory ${serverStreamPath}`
      );
    });

    if (!this.appServerUp) {
      if (fs.existsSync(appServerPath)) fs.unlinkSync(appServerPath);
      this.appServer.listen(appServerPath);
      this.appServerUp = true;
    }
  }

  destroyConnections() {
    this.connections.forEach(c => c.destroy());
  }
}
