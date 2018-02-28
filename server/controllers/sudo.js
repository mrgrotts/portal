// https://stackoverflow.com/questions/11904159/automatically-remove-referencing-objects-on-deletion-in-mongodb
const database = require('../database');

exports.getCompanies = (req, res, next) => {
  database.Companies.find()
    .then(companies => res.json(companies))
    .catch(error => res.status(500).json(error));
};

exports.getUsers = (req, res, next) => {
  database.Users.find()
    .then(users => res.json(users))
    .catch(error => res.status(500).json(error));
};

exports.createUser = (req, res, next) => {
  database.Users.create(req.body)
    .then(user => res.status(201).json(user))
    .catch(error => res.send(error));
};

exports.readUser = (req, res, next) => {
  database.Users.findById(req.params.userId)
    .then(user => res.status(200).json(user))
    .catch(error => res.send(error));
};

exports.updateUser = (req, res, next) => {
  database.Users.findByIdAndUpdate(req.params.userId, req.body, { new: true })
    .populate('user')
    .then(user => res.status(201).json(user))
    .catch(error => res.send(error));
};

exports.deleteUser = (req, res, next) => {
  database.Users.findByIdAndRemove(req.params.userId)
    .then(user => res.json(user))
    .catch(error => res.send(error));
};

exports.getLocations = (req, res, next) => {
  database.Locations.find()
    .then(locations => {
      res.json(locations);
    })
    .catch(error => {
      res.status(500).json(error);
    });
};

exports.createLocation = (req, res, next) => {
  const newLocation = {
    userId: req.params.userId,
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
      database.Users.findById(req.params.locationId)
        .then(user => {
          user.locations.push(location._id);
          user
            .save()
            .then(user => database.Locations.findById(location._id).populate('userId'))
            .then(loc => res.status(200).json(loc))
            .catch(next);
        })
        .catch(next);
    })
    .catch(next);
};

exports.readLocation = (req, res, next) => {
  database.Locations.findById(req.params.locationId)
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

  database.Locations.findByIdAndUpdate(req.params.locationId, updatedLocation, {
    new: true
  })
    .then(location => res.status(201).json(location))
    .catch(error => res.send(error));
};

exports.deleteLocation = (req, res, next) => {
  database.Locations.findByIdAndRemove(req.params.locationId)
    .then(location => res.json(location))
    .catch(error => res.send(error));
};

exports.getWorkList = (req, res, next) => {
  database.Work.find()
    .sort({ createAt: 'desc' })
    .populate('userId', { username: true, profileImageUrl: true })
    .then(work => {
      res.json(work);
    })
    .catch(error => {
      res.status(500).json(error);
    });
};

exports.createWork = (req, res, next) => {
  const newWork = {
    userId: req.params.userId,
    category: req.body.category,
    location: req.body.location,
    description: req.body.description,
    media: req.body.media,
    requestedDate: req.body.requestedDate
  };

  database.Work.create(newWork)
    // .then(work => res.status(201).json(work))
    // .catch(error => res.send(error));

    .then(work => {
      database.Locations.findById(work.location._id)
        .then(location => {
          location.work.push(work._id);
          location.save();
        })
        .catch(next);

      database.Users.findById(req.params.userId)
        .then(user => {
          user.work.push(work._id);
          // user.locations.work.push(work.id);
          user
            .save()
            .then(work => database.Work.findById(work._id).populate('userId'))
            .then(t => res.status(201).json(t))
            .catch(next);
        })
        .catch(next);
    })
    .catch(next);
};

exports.readWork = (req, res, next) => {
  database.Work.findById(req.params.workId)
    .then(work => res.status(200).json(work))
    .catch(error => res.send(error));
};

exports.updateWork = (req, res, next) => {
  // console.log(req.body);
  database.Work.findByIdAndUpdate(req.params.workId, req.body, { new: true })
    .populate('work')
    .then(work => res.status(201).json(work))
    .catch(error => res.send(error));
};

exports.deleteWork = (req, res, next) => {
  database.Work.findByIdAndRemove(req.params.workId)
    .then(work => res.json(work))
    .catch(error => res.send(error));
};

module.exports = exports;
