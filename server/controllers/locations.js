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
    addressOne: `${req.body.location.street_number} ${req.body.location.route}`,
    streetNumber: req.body.location.street_number,
    route: req.body.location.route,
    neighborhood: req.body.location.neighborhood,
    city: req.body.location.locality,
    township: req.body.location.administrative_area_level_3,
    county: req.body.location.administrative_area_level_2,
    state: req.body.location.administrative_area_level_1,
    zipcode: req.body.location.postal_code,
    zipcodeSuffix: req.body.location.postal_code_suffix,
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
    addressOne: `${req.body.location.street_number} ${req.body.location.route}`,
    streetNumber: req.body.location.street_number,
    route: req.body.location.route,
    neighborhood: req.body.location.neighborhood,
    city: req.body.location.locality,
    township: req.body.location.administrative_area_level_3,
    county: req.body.location.administrative_area_level_2,
    state: req.body.location.administrative_area_level_1,
    zipcode: req.body.location.postal_code,
    zipcodeSuffix: req.body.location.postal_code_suffix,
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
