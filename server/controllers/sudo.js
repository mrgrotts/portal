const database = require('../database');

exports.getAdmins = (req, res) => {
  database.Admins.find()
    .then(admins => res.json(admins))
    .catch(error => res.status(500).json(error));
};

exports.createAdmin = (req, res) => {
  const admin = ({
    email,
    password,
    firstName,
    lastName,
    countryCode,
    phone,
    profilePicture,
    verified
  } = req.body);

  database.Admins.create(admin)
    .then(admin => res.status(201).json(admin))
    .catch(error => res.send(error));
};

exports.readAdmin = (req, res) => {
  database.Admins.findById(req.params.id)
    .then(admin => res.status(200).json(admin))
    .catch(error => res.send(error));
};

exports.updateAdmin = (req, res) => {
  // const admin = ({
  //   email,
  //   password,
  //   firstName,
  //   lastName,
  //   countryCode,
  //   phone,
  //   profilePicture,
  //   admin,
  //   verified
  // } = req.body);

  database.Admins.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .populate('admin')
    .then(admin => res.status(201).json(admin))
    .catch(error => res.send(error));
};

exports.deleteAdmin = (req, res) => {
  database.Admins.findByIdAndRemove(req.params.id)
    .then(admin => res.json(admin))
    .catch(error => res.send(error));
};

exports.getUsers = (req, res) => {
  database.Users.find()
    .then(users => res.json(users))
    .catch(error => res.status(500).json(error));
};

exports.createUser = (req, res) => {
  const user = ({
    email,
    password,
    firstName,
    lastName,
    countryCode,
    phone,
    profilePicture,
    admin,
    verified
  } = req.body);

  database.Users.create(user)
    .then(user => res.status(201).json(user))
    .catch(error => res.send(error));
};

exports.readUser = (req, res) => {
  database.Users.findById(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(error => res.send(error));
};

exports.updateUser = (req, res) => {
  // const user = ({
  //   email,
  //   password,
  //   firstName,
  //   lastName,
  //   countryCode,
  //   phone,
  //   profilePicture,
  //   admin,
  //   verified
  // } = req.body);

  database.Users.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .populate('user')
    .then(user => res.status(201).json(user))
    .catch(error => res.send(error));
};

exports.deleteUser = (req, res) => {
  database.Users.findByIdAndRemove(req.params.id)
    .then(user => res.json(user))
    .catch(error => res.send(error));
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
    .then(location => res.status(201).json(location))
    .catch(error => res.send(error));

  // .then(location => {
  //   database.Users.findById(req.params.id)
  //     .then(user => {
  //       user.locations.push(location.id);
  //       user
  //         .save()
  //         .then(user =>
  //           database.Locations.findById(location._id).populate('userId')
  //         )
  //         .then(loc => res.status(200).json(loc))
  //         .catch(next);
  //     })
  //     .catch(next);
  // })
  // .catch(next);
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

  database.Locations.findByIdAndUpdate(req.params.id, updatedLocation, {
    new: true
  })
    .then(location => res.status(201).json(location))
    .catch(error => res.send(error));
};

exports.deleteLocation = (req, res, next) => {
  database.Locations.findByIdAndRemove(req.params.id)
    .then(location => res.json(location))
    .catch(error => res.send(error));
};

exports.getWorkList = (req, res, next) => {
  database.WorkList.find()
    .sort({ createAt: 'desc' })
    .populate('userId', { username: true, profileImageUrl: true })
    .then(workList => {
      res.json(workList);
    })
    .catch(error => {
      res.status(500).json(error);
    });
};

exports.createWork = (req, res, next) => {
  const newWork = {
    userId: req.params.id,
    category: req.body.category,
    location: req.body.location,
    description: req.body.description,
    media: req.body.media,
    requestedDate: req.body.requestedDate
  };

  database.WorkList.create(newWork)
    .then(work => res.status(201).json(work))
    .catch(error => res.send(error));

  // .then(work => {
  //   //   database.Locations.findById(work.location._id)
  //   //     .then(location => {
  //   //       location.workList.push(work.id);
  //   //       location.save();
  //   //     })
  //   //     .catch(next);

  //   database.Users.findById(req.params.id)
  //     .then(user => {
  //       user.workList.push(work.id);
  //       // user.locations.workList.push(work.id);
  //       user
  //         .save()
  //         .then(work =>
  //           database.WorkList.findById(work._id).populate('userId')
  //         )
  //         .then(t => res.status(201).json(t))
  //         .catch(next);
  //     })
  //     .catch(next);
  // })
  // .catch(next);
};

exports.readWork = (req, res, next) => {
  database.WorkList.findById(req.params.id)
    .then(work => res.status(200).json(work))
    .catch(error => res.send(error));
};

exports.updateWork = (req, res, next) => {
  const updatedWork = {
    status: req.body.status,
    category: req.body.category,
    location: req.body.location,
    description: req.body.description,
    media: req.body.media,
    comments: req.body.comments,
    assignedTo: req.body.assignedTo,
    requestedDate: req.body.requestedDate,
    scheduledFor: req.body.scheduledFor,
    partPurchasedDate: req.body.partPurchasedDate,
    partArrivedDate: req.body.partArrivedDate,
    workCompleted: req.body.workCompleted,
    hoursSpent: req.body.hoursSpent,
    hourlyRate: req.body.hourlyRate,
    completedDate: req.body.completedDate,
    requestedDeletion: req.body.requestedDeletion
  };
  // console.log(req.body);

  // database.WorkList.findByIdAndUpdate(req.params.id, updatedWork, { new: true });
  database.WorkList.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .populate('work')
    .then(work => res.status(201).json(work))
    .catch(error => res.send(error));
};

exports.deleteWork = (req, res, next) => {
  database.WorkList.findByIdAndRemove(req.params.id)
    .then(work => res.json(work))
    .catch(error => res.send(error));
};

module.exports = exports;