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
const authRoutes = require('./routes/auth');
const ticketRoutes = require('./routes/tickets');

const { API_WELCOME_MESSAGE } = require('./constants');

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

app.use(
  '/api/users/:id/tickets',
  authenticateUser,
  authorizeUser,
  ticketRoutes
);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: API_WELCOME_MESSAGE });
});

app.get('/api/tickets', (req, res, next) => {
  database.Ticket.find()
    .sort({ createAt: 'desc' })
    .populate('userId', { profilePicture: true })
    .then(tickets => {
      res.json(tickets);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

const server = http.createServer(app);
server.listen(PORT, IP, () => {
  console.log(`[${process.env.APP_NAME}]: Launched on port ${PORT}.`);
});
