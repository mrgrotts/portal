const database = require('../database');
const mongoose = require('mongoose');

exports.readTickets = (req, res, next) => {
  database.Users.findById(req.params.userId).then(user => {
    if (user.admin) {
      database.Tickets.find()
        .sort({ createdAt: 'asc' })
        .populate('location')
        .populate('userId')
        .then(tickets => res.status(200).json(tickets))
        .catch(error => res.send(error));
    } else {
      database.Tickets.find({ userId: req.params.userId })
        .sort({ createdAt: 'asc' })
        .populate('location')
        .populate('userId')
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
                        .populate('location')
                        .populate('userId')
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

  // const oldLocation = await database.Locations.findById(
  //   req.body.previousLocation, {
  //     tickets: 1
  //   }
  // ).catch(error => console.log(error));

  // const oldLocationTicket = await database.Tickets.find({
  //   _id: {
  //     $in: oldLocation['tickets']
  //   }
  // }).catch(error => console.log(error));

  // const oldLocationTickets = await oldLocation
  // .update({
  //   $pull: { tickets: { $elemMatch: { _id: ticket._id } } }
  // })
  // .exec();

  // await oldLocation.update({
  //   $pull: {
  //     tickets: {
  //       $elemMatch: {
  //         _id: ticket._id
  //       }
  //     }
  //   }
  // });

  // await oldLocationTicket.remove({
  //   $pull: { tickets: { $elemMatch: { _id: ticket._id } } }
  // });

  // console.log('[TICKET]', ticket);
  // console.log('[OLD LOCATION]', oldLocation);
  // console.log('[OLD LOCATION TICKET]', oldLocationTicket);

  ticket
    .save()
    .then((
      ticket // database.Locations.findById(ticket.location)
    ) =>
      //   .then(location => {
      //     location.tickets.push(ticket._id);
      //     location
      //       .save()
      //       .then(loc =>
      database.Tickets.findById(ticket._id)
        .populate('location')
        .populate('userId')
        .then(ticket => res.status(200).json(ticket))
        .catch(error => res.send(error))
    )
    .catch(next);
  //     })
  //     .catch(next)
  // )
  // .catch(next);
};

exports.deleteTicket = (req, res, next) => {
  database.Tickets.findByIdAndRemove(req.params.ticketId)
    .then(ticket => res.json(ticket))
    .catch(error => res.send(error));
};

module.exports = exports;

// exports.updateTicket = (req, res, next) => {
//   const updatedTicket = {
//     status: req.body.status,
//     category: req.body.category,
//     location: req.body.location,
//     previousLocation: req.body.previousLocation,
//     description: req.body.description,
//     media: req.body.media,
//     comments: req.body.comments,
//     assignedTo: req.body.assignedTo,
//     requestedDate: req.body.requestedDate,
//     scheduledFor: req.body.scheduledFor,
//     partPurchasedDate: req.body.partPurchasedDate,
//     partArrivedDate: req.body.partArrivedDate,
//     workCompleted: req.body.workCompleted,
//     hoursSpent: req.body.hoursSpent,
//     hourlyRate: req.body.hourlyRate,
//     completedDate: req.body.completedDate,
//     requestedDeletion: req.body.requestedDeletion
//   };

//   // database.Locations.findById(req.body.location, { tickets: 1 })
//   // var addresses = db.address.find({ _id: { $in: result['address_ids'] } });

//   database.Tickets.findByIdAndUpdate(req.params.id, updatedTicket, {
//     new: true
//   })
//     .populate('location')
//     .then(ticket => {
//       console.log('[TICKET TO ADD]', ticket);
//       console.log('[PREVIOUS]', ticket.previousLocation);

//       database.Locations.findByIdAndUpdate(
//         ticket.location._id,
//         { $push: { tickets: ticket } },
//         { new: true, upsert: true }
//       )
//         .then(location => {
//           // console.log('[LOCATION]', location);
//           // console.log('[LOCATION TICKETS]', location.tickets);
//           // let tickets = location.tickets.push(ticket._id);
//           // console.log('[UPDATED LOCATION TICKETS]', tickets);
//           // location.save();
//         })
//         .catch(next);

//       database.Locations.findById(ticket.previousLocation)
//         .then(location => {
//           console.log('[OLD LOCATION]', location);
//           console.log('[OLD LOCATION TICKETS]', location.tickets);

//           let tickets = location.tickets.filter(
//             t =>
//               mongoose.Types.ObjectId(t._id) !==
//               mongoose.Types.ObjectId(ticket._id)
//           );
//           console.log('[OLD LOCATION UPDATED TICKETS]', tickets);

//           location
//             .update({
//               $set: { tickets }
//             })
//             .exec();

//           // location.set({
//           //   tickets: location.tickets.filter(t => t._id !== ticket._id)
//           // });
//         })
//         .catch(next);

//       // database.Locations.findById(ticket.previousLocation)
//       //   .then(location => {
//       // console.log('[OLD LOCATION]', location);
//       // console.log('[OLD LOCATION TICKETS]', location.tickets);
//       //     let tickets = location.tickets.filter(t => t._id !== ticket._id);

//       //     location
//       //       .update({
//       //         $set: { tickets }
//       //       })
//       //       .exec();

//       //     console.log('[OLD LOCATION UPDATED TICKETS]', tickets);
//       //   })
//       //   .catch(next);
//     })
//     .then(loc => {
//       database.Tickets.findById(req.params.id)
//         .then(ticket => res.status(201).json(ticket))
//         .catch(next);
//     })
//     .catch(error => res.send(error));
// };
