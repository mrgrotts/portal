const database = require("../database");

exports.readLocations = (req, res, next) => {
  database.Users.findById(req.params.userId).then(user => {
    if (user.role === "Owner") {
      database.Locations.find()
        .sort({ createdAt: "asc" })
        .populate("tickets")
        .populate("userId")
        .then(locations => res.status(200).json(locations))
        .catch(error => res.send(error));
    } else {
      database.Locations.find({ userId: req.params.userId })
        .sort({ createdAt: "asc" })
        .populate("tickets")
        .populate("userId")
        .then(locations => res.status(200).json(locations))
        .catch(error => res.send(error));
    }
  });
};

exports.createLocation = (req, res, next) => {
  const newLocation = {
    userId: req.params.userId,
    name: req.body.name,
    phone: req.body.phone,
    streetNumber: req.body.streetNumber,
    route: req.body.route,
    addressOne: req.body.addressOne,
    addressTwo: req.body.addressTwo,
    neighborhood: req.body.neighborhood,
    city: req.body.city,
    township: req.body.township,
    county: req.body.county,
    state: req.body.state,
    zipcode: req.body.zipcode,
    zipcodeSuffix: req.body.zipcodeSuffix,
    country: req.body.country,
    latitude: req.body.latitude,
    longitude: req.body.longitude
  };

  database.Locations.create(newLocation)
    .then(location => {
      database.Users.findById(req.params.userId)
        .then(user => {
          user.locations.push(location._id);
          user
            .save()
            .then(user =>
              database.Locations.findById(location._id)
                .populate("tickets")
                .populate("userId")
            )
            .then(loc => res.status(200).json(loc))
            .catch(next);
        })
        .catch(next);
    })
    .catch(next);
};

exports.readLocation = (req, res, next) => {
  database.Locations.findById(req.params.locationId)
    .populate("tickets")
    .populate("userId")
    .then(location => res.json(location))
    .catch(error => res.send(error));
};

exports.updateLocation = (req, res, next) => {
  const updatedLocation = {
    name: req.body.name,
    phone: req.body.phone,
    streetNumber: req.body.streetNumber,
    route: req.body.route,
    addressOne: req.body.addressOne,
    addressTwo: req.body.addressTwo,
    neighborhood: req.body.neighborhood,
    city: req.body.city,
    township: req.body.township,
    county: req.body.county,
    state: req.body.state,
    zipcode: req.body.zipcode,
    zipcodeSuffix: req.body.zipcodeSuffix,
    country: req.body.country,
    latitude: req.body.latitude,
    longitude: req.body.longitude
  };

  database.Locations.findByIdAndUpdate(req.params.locationId, req.body, {
    new: true
  })
    .populate("tickets")
    .populate("userId")
    .then(location => res.status(201).json(location))
    .catch(error => res.send(error));
};

exports.deleteLocation = (req, res, next) => {
  database.Locations.findByIdAndRemove(req.params.locationId)
    .then(location => res.json(location))
    .catch(error => res.send(error));
};

module.exports = exports;
