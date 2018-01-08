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

app.use('/api/auth', authRoutes);
app.use(
  '/api/users/:id/tickets',
  authenticateUser,
  authorizeUser,
  ticketRoutes
);

app.get('/', (req, res) => {
  res.json({ message: API_WELCOME_MESSAGE });
});

app.get('/api/users', (req, res) => {
  database.User.find()
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

app.get('/api/tickets', (req, res, next) => {
  res.json([
    {
      _id: 'Unique Identifier',
      userId: 'Unique String',
      status: 'Enum',
      category: 'Enum',
      location: {
        addressOne: 'String',
        addressTwo: 'String',
        city: 'String',
        state: 'String',
        zipcode: 'Number',
        latitude: 'Number',
        longitude: 'Number'
      },
      description: 'String',
      media: ['Array of Google Cloud Storage URLs'],
      comments: ['Array of Comments'],
      assignedTo: 'Enum',
      requestedDate: 'Date',
      scheduledFor: 'Date',
      partPurchasedDate: 'Date',
      partArrivedDate: 'Date',
      workCompleted: 'String',
      hoursSpent: 'Number',
      hourlyRate: 'Number',
      completedDate: 'Date',
      requestedDeletion: 'Boolean',
      createdAt: 'Date',
      updatedAt: 'Date'
    }
  ]);
});

const server = http.createServer(app);
server.listen(PORT, IP, () => {
  console.log(`[${process.env.APP_NAME}]: Launched on port ${PORT}.`);
});
