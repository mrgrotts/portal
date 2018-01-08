const database = require('../database');

exports.readTickets = (req, res, next) => {
  database.Ticket.find()
    .sort({ createAt: 'desc' })
    // .populate('userId', { profilePicture: true })
    .then(tickets => res.status(200).json(tickets))
    .catch(error => res.send(error));
};

exports.createTicket = (req, res, next) => {
  const newTicket = {
    userId: req.params.id,
    category: req.body.category,
    location: req.body.location,
    description: req.body.description,
    media: req.body.media,
    requestedDate: req.body.requestedDate
  };

  database.Ticket.create(newTicket)
    .then(ticket => {
      database.User.findById(req.params.id)
        .then(user => {
          user.tickets.push(ticket.id);
          user
            .save()
            .then(user =>
              database.Ticket.findById(ticket._id).populate('userId', {
                profilePicture: true
              })
            )
            .then(t => res.status(200).json(t))
            .catch(next);
        })
        .catch(next);
    })
    .catch(next);
};

exports.readTicket = (req, res, next) => {
  database.Ticket.findById(req.params.id)
    .then(ticket => res.json(ticket))
    .catch(error => res.send(error));
};

exports.updateTicket = (req, res, next) => {
  const updatedTicket = {
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

  database.Ticket.findByIdAndUpdate(req.params.id, updatedTicket, {
    new: true
  })
    .then(ticket => res.status(201).json(ticket))
    .catch(error => res.send(error));
};

exports.deleteTicket = (req, res, next) => {
  database.Ticket.findByIdAndRemove(req.params.id)
    .then(ticket => res.json(ticket))
    .catch(error => res.send(error));
};

module.exports = exports;
