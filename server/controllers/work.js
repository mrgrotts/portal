const database = require('../database');
const mongoose = require('mongoose');

exports.readWorkList = (req, res, next) => {
  database.Users.findById(req.params.userId).then(user => {
    if (user.role === 'Owner') {
      database.Work.find()
        .sort({ createdAt: 'asc' })
        .populate('location')
        .populate('userId')
        .then(work => res.status(200).json(work))
        .catch(error => res.send(error));
    } else if (user.role === 'Admin') {
      database.Work.find()
        .sort({ createdAt: 'asc' })
        .populate('location')
        .populate('userId')
        .then(work => res.status(200).json(work))
        .catch(error => res.send(error));
    } else {
      database.Work.find({ userId: req.params.userId })
        .sort({ createdAt: 'asc' })
        .populate('location')
        .populate('userId')
        .then(work => res.status(200).json(work))
        .catch(error => res.send(error));
    }
  });
};

exports.createWork = (req, res, next) => {
  const newWork = {
    userId: req.params.userId,
    company: req.body.company,
    category: req.body.category,
    location: req.body.location,
    description: req.body.description,
    media: req.body.media,
    requestedDate: req.body.requestedDate
  };

  // console.log(newWork);

  database.Work.create(newWork)
    .then(work => {
      database.Locations.findById(work.location)
        .then(location => {
          location.work.push(work._id);
          location
            .save()
            .then(location => {
              database.Users.findById(req.params.userId)
                .then(user => {
                  user.work.push(work._id);
                  user
                    .save()
                    .then(user =>
                      database.Work.findById(work._id)
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

exports.readWork = (req, res, next) => {
  database.Work.findById(req.params.workId)
    .then(work => res.status(200).json(work))
    .catch(error => res.send(error));
};

exports.updateWork = async (req, res, next) => {
  const updatedWork = {
    company: req.body.company,
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

  const work = await database.Work.findByIdAndUpdate(req.params.workId, updatedWork, {
    new: true
  }).catch(error => console.log(error));

  work
    .save()
    .then(work =>
      database.Work.findById(work._id)
        .populate('company')
        .populate('location')
        .populate('userId')
        .then(work => res.status(200).json(work))
        .catch(error => res.send(error))
    )
    .catch(next);
};

exports.deleteWork = (req, res, next) => {
  database.Work.findByIdAndRemove(req.params.workId)
    .then(work => res.json(work))
    .catch(error => res.send(error));
};

module.exports = exports;
