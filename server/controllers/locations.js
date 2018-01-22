const database = require('../database');

exports.readLocations = (req, res, next) => {
  database.Users.findById(req.params.id).then(user => {
    if (user.admin) {
      database.Locations.find()
        .sort({ createdAt: 'asc' })
        .then(locations => res.status(200).json(locations))
        .catch(error => res.send(error));
    } else {
      database.Locations.find({ userId: req.params.id })
        .sort({ createdAt: 'asc' })
        .then(locations => res.status(200).json(locations))
        .catch(error => res.send(error));
    }
  });
};

exports.createLocation = (req, res, next) => {
  const newLocation = {
    userId: req.params.id,
    name: req.body.name,
    addressOne: req.body.addressOne,
    addressTwo: req.body.addressTwo,
    city: req.body.city,
    state: req.body.state,
    zipcode: req.body.zipcode,
    latitude: req.body.latitude,
    longitude: req.body.longitude
  };

  database.Locations.create(newLocation)
    .then(location => {
      database.Users.findById(req.params.id)
        .then(user => {
          user.locations.push(location.id);
          user
            .save()
            .then(user =>
              database.Locations.findById(location._id).populate('userId')
            )
            .then(loc => res.status(200).json(loc))
            .catch(next);
        })
        .catch(next);
    })
    .catch(next);
};

exports.readLocation = (req, res, next) => {
  database.Locations.findById(req.params.id)
    .then(location => res.json(location))
    .catch(error => res.send(error));
};

exports.updateLocation = (req, res, next) => {
  const updatedLocation = {
    name: req.body.name,
    addressOne: req.body.addressOne,
    addressTwo: req.body.addressTwo,
    city: req.body.city,
    state: req.body.state,
    zipcode: req.body.zipcode,
    latitude: req.body.latitude,
    longitude: req.body.longitude
  };

  database.Locations.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  })
    // .populate('userId')
    .then(location => res.status(201).json(location))
    .catch(error => res.send(error));
};

exports.deleteLocation = (req, res, next) => {
  database.Locations.findByIdAndRemove(req.params.id)
    .then(location => res.json(location))
    .catch(error => res.send(error));
};

module.exports = exports;
