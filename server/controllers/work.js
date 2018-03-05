// https://stackoverflow.com/questions/11904159/automatically-remove-referencing-objects-on-deletion-in-mongodb
require('dotenv').load();
const fs = require('fs');
const database = require('../database');
const mongoose = require('mongoose');
const multer = require('multer');
const Storage = require('@google-cloud/storage');

// Instantiate a storage client
const storage = Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
  keyFilename: process.env.GCLOUD_KEY_FILE
});

// Accept Image Files Only
const fileFilter = (req, file, callback) => {
  if (!files[f].originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only Image files are allowed.'), false);
  }

  callback(null, true);
};

const m = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // no larger than 10mb
  },
  fileFilter
}).any();

// A bucket is a container for objects (files).
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

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

// UPLOAD TO GOOGLE CLOUD STORAGE
exports.updateWorkMedia = (req, res, next) => m => {
  console.log(`[FILES]: ${req.files}`);
  let media = [];

  try {
    const uploadHandler = async (files = req.files, f = 0) => {
      if (f >= files.length - 1) {
        res.json(media);
      } else {
        const fileName = `${req.params.workId}_${files[f].name}`;
        const contentType = files[f].originalname.slice(files[f].originalname.lastIndexOf('.') + 1);
        const metadata = { metadata: contentType };

        const uploaded = await bucket.upload(fileName, { metadata });
        console.log(uploaded);
        await uploaded.makePublic();

        const file = await uploaded.get();
        media.push({
          name: file.name,
          url: file.metadata.mediaLink,
          type: file.metadata.metadata.contentType
        });

        fs.unlink(fileName, async () => {
          const work = await database.Work.findById(req.params.workId);
          work.media = media;
          await work.update({ _id: work._id }, { $set: { media } }, { new: true });
        });

        uploadHandler(files, f++);
      }
    };

    uploadHandler(req.files);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

// DOWNLOAD FROM GOOGLE CLOUD STORAGE
exports.readWorkMedia = async (req, res, next) => {
  console.log(req.files);
  let media = [];

  try {
    const work = await database.Work.findById(req.params.workId);

    const downloadHandler = async (files = work.media, f = 0) => {
      if (f >= files.length - 1) {
        res.json(media);
      } else {
        const file = await bucket.file(files[f]);
        const destination = `./tmp/${work._id}_${file.name}`;

        if (file !== null) {
          console.log(`[FILE]: ${file}`);
          const options = { destination };

          await file.download(options);

          media.push({
            name: file.name,
            url: file.metadata.mediaLink,
            type: file.metadata.metadata.contentType
          });
        } else {
          downloadHandler(files, f++);
        }
        downloadHandler(files, f++);
      }
    };

    downloadHandler(req.files);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

// DOWNLOAD SINGLE FILE FROM GOOGLE CLOUD STORAGE
exports.readWorkMediaFile = async (req, res, next) => {
  console.log(req.files);
  try {
    const file = await bucket.file(req.body.media[req.params.mediaId]);
    console.log(file);
    const destination = `./tmp/${work._id}_${file.name}`;

    if (file !== null) {
      console.log(file);
      const options = { destination };

      const media = await file.download(options);
      res.json(media);
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

// DELETE FROM GOOGLE CLOUD STORAGE
exports.deleteWorkMediaFile = async (req, res, next) => {
  console.log(req.files);
  try {
    const file = await bucket.file(req.body.media[req.params.mediaId]);
    console.log(file);
    await file.delete();
    const work = await database.Work.findById(req.params.workId);
    const media = work.media.filter(f => f !== file);
    console.log(media);

    await work.update({ _id: work._id }, { $set: { media } }, { new: true });
    res.json(media);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

module.exports = exports;

exports.createWorkz = async (req, res, next) => {
  console.log(req.body.files);
  let media = [];

  const newWork = {
    userId: req.params.userId,
    company: req.body.company,
    category: req.body.category,
    location: req.body.location,
    description: req.body.description,
    media: req.body.media,
    requestedDate: req.body.requestedDate
  };
};
