const database = require('../database');

exports.readTickets = (req, res, next) => {
  database.Users.findById(req.params.id).then(user => {
    if (user.admin) {
      database.Tickets.find()
        .sort({
          createdAt: 'asc'
        })
        .then(tickets => res.status(200).json(tickets))
        .catch(error => res.send(error));
    } else {
      database.Tickets.find({
        userId: req.params.id
      })
        .sort({
          createdAt: 'asc'
        })
        .then(tickets => res.status(200).json(tickets))
        .catch(error => res.send(error));
    }
  });
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

  database.Tickets.create(newTicket)
    .then(ticket => {
      database.Locations.findById(ticket.location)
        .then(location => {
          location.tickets.push(ticket._id);
          location
            .save()
            .then(location =>
              database.Tickets.findById(ticket._id).populate('location')
            )
            .then(loc => res.status(201).json(loc))
            .catch(next);
        })
        .catch(next);

      database.Users.findById(req.params.id)
        .then(user => {
          user.tickets.push(ticket._id);
          user
            .save()
            .then(user =>
              database.Tickets.findById(ticket._id).populate('userId')
            )
            .then(t => res.status(200).json(t))
            .catch(next);
        })
        .catch(next);
    })
    .catch(next);
};

exports.readTicket = (req, res, next) => {
  database.Tickets.findById(req.params.id)
    .then(ticket => res.status(200).json(ticket))
    .catch(error => res.send(error));
};

exports.updateTicket = (req, res, next) => {
  const updatedTicket = {
    status: req.body.status,
    category: req.body.category,
    location: req.body.location,
    previousLocation: req.body.previousLocation,
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
  // database.Tickets.findByIdAndUpdate(req.params.id, updatedTicket, { new: true });
  database.Tickets.findByIdAndUpdate(req.params.id, updatedTicket, {
    new: true
  })
    .then(ticket => {
      // database.Locations.findByIdAndUpdate(ticket.location, {
      //   $set: {
      //     tickets: location.tickets
      //   }
      // }, {
      //   new: true, upsert: true
      // })
      console.log('[TICKET TO ADD]', ticket);
      database.Locations.findById(ticket.location)
        .then(location => {
          console.log('[LOCATION]', location);
          console.log('[LOCATION TICKETS]', location.tickets);

          location.tickets = [...location.tickets, ticket];
          // location.tickets.push(ticket._id);

          location.update(
            { _id: location._id },
            { $set: { tickets: location.tickets } },
            (error, result) => {
              if (error) {
                res.send(error);
              }
            }
          );

          console.log('[UPDATED LOCATION TICKETS]', location.tickets);
        })
        .catch(next);

      database.Locations.findById(ticket.previousLocation)
        .then(location => {
          // console.log('[TICKET TO ADD]', ticket);
          console.log('[OLD LOCATION]', location);
          console.log('[OLD LOCATION TICKETS]', location.tickets);

          let updates = location.tickets.filter(t => t._id !== ticket._id);
          // location.tickets.push(ticket._id);

          location.update(
            { _id: location._id },
            { $set: { tickets: updates } },
            (error, result) => {
              if (error) {
                res.send(error);
              }
            }
          );

          console.log('[UPDATED OLD LOCATION TICKETS]', location.tickets);
        })
        .catch(next);
    })
    .then(loc => {
      database.Tickets.findById(req.params.id)
        // .populate('location')
        // .populate('userId')
        .then(ticket => res.status(201).json(ticket))
        .catch(next);
    })
    .catch(error => res.send(error));
};

exports.deleteTicket = (req, res, next) => {
  database.Tickets.findByIdAndRemove(req.params.id)
    .then(ticket => res.json(ticket))
    .catch(error => res.send(error));
};

module.exports = exports;
