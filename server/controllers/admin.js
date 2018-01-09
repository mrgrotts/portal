const database = require('../database');

exports.getUsers = (req, res) => {
  database.Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
};

exports.getLocations = (req, res) => {
  database.Locations.find()
    .then(locations => {
      res.json(locations);
    })
    .catch(error => {
      res.status(500).json(error);
    });
};

exports.getTickets = (req, res, next) => {
  database.Tickets.find()
    .sort({ createAt: 'desc' })
    .populate('userId', { username: true, profileImageUrl: true })
    .then(tickets => {
      res.json(tickets);
    })
    .catch(error => {
      res.status(500).json(error);
    });
};
