'use strict';
require('dotenv').load();
const Storage = require('@google-cloud/storage');
const Multer = require('multer');
// Accept Image Files Only
const fileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only Image files are allowed.'), false);
  }
  callback(null, true);
};

// Multer parses Multipart Form Data off of req.files
exports.multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // no larger than 10mb
  },
  fileFilter
});

// Instantiate a storage client
const storage = Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
  keyFilename: process.env.GCLOUD_KEY_FILE
});

// A bucket is a container for objects (files).
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

// Returns the public, anonymously accessable URL to a given Cloud Storage
// object.
// The object's ACL has to be set to public read.
// [START public_url]
const getGoogleCloudStoragePublicUrl = filename =>
  `https://storage.googleapis.com/${
    process.env.GCLOUD_STORAGE_BUCKET
  }/${filename}`;
// [END public_url]

// Express middleware that will automatically pass uploads to Cloud Storage.
// req.file is processed and will have two new properties:
// * ``cloudStorageObject`` the object name in cloud storage.
// * ``cloudStoragePublicUrl`` the public url to the object.
// [START process]
exports.streamUploadToGoogleCloudStorage = (req, res, next) => {
  if (!req.file) {
    console.log('No file.');
    return next();
  }

  console.log(`[UPLOADED TO NODE]:\n${req.file.originalname}`);

  const fileName = `${req.params.workId}_${req.file.originalname}`;

  const file = bucket.file(fileName);
  console.log(`[FILE NAME]:\n${fileName}`);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  });

  stream.on('error', error => {
    req.file.cloudStorageError = error;
    next(error);
  });

  stream.on('finish', async () => {
    req.file.cloudStorageObject = fileName;
    await file.makePublic();
    req.file.cloudStoragePublicUrl = await getGoogleCloudStoragePublicUrl(
      fileName
    );

    console.log(`[GCP FILE]:\n${req.file.cloudStorageObject}`);
    next();
  });

  stream.end(req.file.buffer);
};
// [END process]

module.exports = exports;
