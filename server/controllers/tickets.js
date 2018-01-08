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

  console.log(newTicket);

  database.Ticket.create(newTicket)
    .then(ticket => {
      database.User.findById(req.params.id)
        .then(user => {
          user.tickets.push(ticket.id);
          user
            .save()
            .then(user => {
              return database.Ticket.findById(ticket._id).populate('userId', {
                profileImageUrl: true
              });
            })
            .then(t => {
              return res.status(200).json(t);
            })
            .catch(next);
        })
        .catch(next);
    })
    .catch(next);
};

exports.updateTicket = (req, res, next) => {
  const updatedTicket = ({
    _id,
    userId,
    status,
    category,
    location,
    description,
    media,
    comments,
    assignedTo,
    requestedDate,
    scheduledFor,
    partPurchasedDate,
    partArrivedDate,
    workCompleted,
    hoursSpent,
    hourlyRate,
    completedDate,
    requestedDeletion
  } = req.body.ticket);

  database.Ticket.findByIdAndUpdate(req.params.id, updatedTicket, { new: true })
    // .then(ticket => {
    //   database.User.findById(req.params.id)
    //     .then(user => {
    //       user.tickets.push(ticket.id);
    //       user
    //         .save()
    //         .then(user => database.Ticket.findById(ticket._id).populate('userId', {
    //             profileImageUrl: true
    //           })
    .then(t => res.status(201).json(t))
    .catch(next);
  //     })
  //     .catch(next);
  // })
  // .catch(next);
};

exports.deleteTicket = (req, res, next) => {
  database.Ticket.findByIdAndRemove(req.params.id)
    .then(res.json({ message: 'Ticket Deleted.' }))
    .catch(error => res.send(error));
};

module.exports = exports;
