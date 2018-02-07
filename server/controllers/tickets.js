const database = require("../database");
const mongoose = require("mongoose");

exports.readTickets = (req, res, next) => {
  database.Users.findById(req.params.userId).then(user => {
    if (user.role === "Owner") {
      database.Tickets.find()
        .sort({ createdAt: "asc" })
        .populate("location")
        .populate("userId")
        .then(tickets => res.status(200).json(tickets))
        .catch(error => res.send(error));
    } else if (user.role === "Admin") {
      database.Tickets.find()
        .sort({ createdAt: "asc" })
        .populate("location")
        .populate("userId")
        .then(tickets => res.status(200).json(tickets))
        .catch(error => res.send(error));
    } else {
      database.Tickets.find({ userId: req.params.userId })
        .sort({ createdAt: "asc" })
        .populate("location")
        .populate("userId")
        .then(tickets => res.status(200).json(tickets))
        .catch(error => res.send(error));
    }
  });
};

exports.createTicket = (req, res, next) => {
  const newTicket = {
    userId: req.params.userId,
    category: req.body.category,
    location: req.body.location,
    description: req.body.description,
    media: req.body.media,
    requestedDate: req.body.requestedDate
  };

  // console.log(newTicket);

  database.Tickets.create(newTicket)
    .then(ticket => {
      database.Locations.findById(ticket.location)
        .then(location => {
          location.tickets.push(ticket._id);
          location
            .save()
            .then(location => {
              database.Users.findById(req.params.userId)
                .then(user => {
                  user.tickets.push(ticket._id);
                  user
                    .save()
                    .then(user =>
                      database.Tickets.findById(ticket._id)
                        .populate("location")
                        .populate("userId")
                    )
                    .then(t => res.status(201).json(t))
                    .catch(next);
                })
                .catch(next);
            })
            .catch(next);
        })
        .catch(next);
    })
    .catch(next);
};

exports.readTicket = (req, res, next) => {
  database.Tickets.findById(req.params.ticketId)
    .then(ticket => res.status(200).json(ticket))
    .catch(error => res.send(error));
};

exports.updateTicket = async (req, res, next) => {
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

  const ticket = await database.Tickets.findByIdAndUpdate(
    req.params.ticketId,
    updatedTicket,
    {
      new: true
    }
  ).catch(error => console.log(error));

  ticket
    .save()
    .then(ticket =>
      database.Tickets.findById(ticket._id)
        .populate("location")
        .populate("userId")
        .then(ticket => res.status(200).json(ticket))
        .catch(error => res.send(error))
    )
    .catch(next);
};

exports.deleteTicket = (req, res, next) => {
  database.Tickets.findByIdAndRemove(req.params.ticketId)
    .then(ticket => res.json(ticket))
    .catch(error => res.send(error));
};

module.exports = exports;
