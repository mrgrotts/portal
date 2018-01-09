const { API_WELCOME_MESSAGE } = require('../constants');

exports.restAPI = (req, res, next) => {
  res.json({
    message: API_WELCOME_MESSAGE,
    usersSchema: '/users',
    locationsSchema: '/locations',
    ticketsSchema: '/tickets'
  });
};

exports.usersAPI = (req, res, next) => {
  res.json({
    _id: 'Unique Identifier',
    email: 'Unique String',
    password: 'Encrypted String (JWT)',
    profilePicture: 'Google Cloud Storage URL'
  });
};

exports.locationsAPI = (req, res, next) => {
  res.json([
    {
      _id: 'Unique Identifier',
      userId: 'Mongo Document Collection',
      name: 'String',
      addressOne: 'String',
      addressTwo: 'String',
      city: 'String',
      state: 'String',
      zipcode: 'Number',
      latitude: 'Number',
      longitude: 'Number'
    }
  ]);
};

exports.ticketsAPI = (req, res, next) => {
  res.json([
    {
      _id: 'Unique Identifier',
      userId: 'Mongo Document Collection',
      status: 'Enum',
      category: 'Enum',
      location: 'Mongo Document Collection',
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
};

// app.get('/api/users', (req, res) => {
//   database.Users.find()
//     .then(users => {
//       res.json(users);
//     })
//     .catch(error => {
//       res.status(500).json(error);
//     });
// });

// app.get('/api/locations', (req, res) => {
//   database.Locations.find()
//     .then(locations => {
//       res.json(locations);
//     })
//     .catch(error => {
//       res.status(500).json(error);
//     });
// });

// app.get('/api/tickets', (req, res, next) => {
//   database.Tickets.find()
//     .sort({ createAt: 'desc' })
//     .populate('userId', { username: true, profileImageUrl: true })
//     .then(tickets => {
//       res.json(tickets);
//     })
//     .catch(error => {
//       res.status(500).json(error);
//     });
// });
