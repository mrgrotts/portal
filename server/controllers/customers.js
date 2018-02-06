const database = require('../database');

exports.readCustomers = (req, res, next) => {
  database.Users.findById(req.params.userId).then(user => {
    if (user.admin) {
      database.Customers.find()
        .sort({ createdAt: 'asc' })
        .populate('owner')
        .populate('tickets')
        .populate('headquarters')
        .populate('locations')
        .populate('users')
        .then(customers => res.status(200).json(customers))
        .catch(error => res.send(error));
    } else {
      database.Customers.find({ userId: req.params.userId })
        .sort({ createdAt: 'asc' })
        .populate('owner')
        .populate('tickets')
        .populate('headquarters')
        .populate('locations')
        .populate('users')
        .then(customers => res.status(200).json(customers))
        .catch(error => res.send(error));
    }
  });
};

exports.createCustomer = (req, res, next) => {
  const newCustomer = {
    name: req.body.name,
    owner: req.params.userId,
    headquarters: req.body.headquarters
  };

  database.Customers.create(newCustomer)
    .then(customer => {
      database.Users.findById(req.params.userId)
        .then(user => {
          user.customers.push(customer._id);
          user
            .save()
            .then(user =>
              database.Customers.findById(customer._id)
                .populate('owner')
                .populate('tickets')
                .populate('headquarters')
                .populate('locations')
                .populate('users')
            )
            .then(loc => res.status(200).json(loc))
            .catch(next);
        })
        .catch(next);
    })
    .catch(next);
};

exports.readCustomer = (req, res, next) => {
  database.Customers.findById(req.params.customerId)
    .populate('owner')
    .populate('tickets')
    .populate('headquarters')
    .populate('locations')
    .populate('users')
    .then(customer => res.json(customer))
    .catch(error => res.send(error));
};

exports.updateCustomer = (req, res, next) => {
  const updatedCustomer = {
    name: req.body.name,
    owner: req.params.userId,
    headquarters: req.body.headquarters,
    users: req.body.users,
    locations: req.body.locations,
    tickets: req.body.tickets
  };

  database.Customers.findByIdAndUpdate(req.params.customerId, updatedCustomer, {
    new: true
  })
    .populate('owner')
    .populate('tickets')
    .populate('headquarters')
    .populate('locations')
    .populate('users')
    .then(customer => res.status(201).json(customer))
    .catch(error => res.send(error));
};

exports.deleteCustomer = (req, res, next) => {
  database.Customers.findByIdAndRemove(req.params.customerId)
    .then(customer => res.json(customer))
    .catch(error => res.send(error));
};

module.exports = exports;
