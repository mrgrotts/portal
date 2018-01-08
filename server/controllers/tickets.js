const database = require('../database');

exports.readTickets = (req, res, next) => {
  database.Ticket.find()
    .sort({ createAt: 'desc' })
    .populate('userId', { profilePicture: true })
    .then(tickets => res.status(200).json(tickets))
    .catch(error => res.send(error));
};

exports.createTicket = (req, res, next) => {
  const newTicket = ({
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

  // const newTicket = {
  //   userId: req.params.id,
  //   status,
  //   category,
  //   location,
  //   description,
  //   media,
  //   comments,
  //   assignedTo,
  //   requestedDate,
  //   scheduledFor,
  //   partPurchasedDate,
  //   partArrivedDate,
  //   workCompleted,
  //   hoursSpent,
  //   hourlyRate,
  //   completedDate,
  //   requestedDeletion
  // };

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

module.exports = exports;
