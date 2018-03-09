'use strict';
require('dotenv').load();
const fs = require('fs');
const path = require('path');
const util = require('util');
const Storage = require('@google-cloud/storage');
const Multer = require('multer');

const database = require('../database');

// Accept Image Files Only
const fileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|svg|pdf|tiff)$/)) {
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

// Returns the public, anonymously accessable URL to a given Cloud Storage object.
// The object's ACL has to be set to public read.
const getGoogleCloudStoragePublicUrl = filename =>
  `https://storage.googleapis.com/${process.env.GCLOUD_STORAGE_BUCKET}/${filename}?uploadType=multipart`;

// Express middleware that will automatically pass uploads to Cloud Storage.
// req.file OR req.files get processed and will have two new properties:
// * ``cloudStorageObject`` the object name in cloud storage.
// * ``cloudStoragePublicUrl`` the public url to the object.
exports.streamUploadToGoogleCloudStorage = (req, res, next) => {
  if (!req.file && !req.files) {
    console.log('No files uploaded.');
    return next();
  }

  console.log(req.files);

  try {
    return req.files.forEach(async file => {
      console.log(`[UPLOADED TO NODE]:\n${file.originalname}`);

      const fileName = `${req.params.workId}_${file.originalname.replace(/(^\s+|[^a-zA-Z0-9. ]+|\s+$)/g, '').replace(/\s+/g, '-')}`;

      const media = await bucket.file(fileName);
      console.log(`[FILE NAME]:\n${fileName}`);

      const stream = await media.createWriteStream({
        metadata: {
          contentType: `multipart/related; boundary=${fileName}`
        }
      });

      await stream.on('error', error => {
        file.cloudStorageError = error;
        next(error);
      });

      await stream.on('finish', async () => {
        file.cloudStorageObject = fileName;
        await media.makePublic();
        file.cloudStoragePublicUrl = await getGoogleCloudStoragePublicUrl(fileName);
        console.log(`[GCP FILE]:\n${file.cloudStorageObject}`);

        const work = await database.Work.findOne({ _id: req.params.workId });
        work.media.push(file.cloudStoragePublicUrl);
        await database.Work.findByIdAndUpdate(work._id, work, { new: true });
        res.json(work);
        next();
      });

      await stream.end(file.buffer);
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

// exports.streamDownloadFromGoogleCloudStorage = async (req, res, next) => {
//   const prefix = `${req.params.workId}`;
//   const delimiter = `/`;
//   const options = { prefix };

//   if (delimiter) {
//     options.delimiter = delimiter;
//   } else options;

//   // console.log('[DELIMITER]', delimiter);
//   console.log('[OPTIONS]', options);
//   // Lists files in the bucket, filtered by a prefix
//   const files = await bucket.getFiles(options);
//   files.reduce((m, f) => m.concat(f), []);
//   console.log('[FILES]', files);

//   files.forEach(file => {
//     // console.log('[FILE]', file);
//     let fileName = file.name;
//     console.log('[FILENAME]', fileName);
//     const destination = path.join(process.cwd(), '..', 'client', 'public', 'assets');
//     // const options = { destination };
//     // .download(options);

//     const media = bucket.file(fileName);
//     const stream = file.createReadStream(destination);

//     stream.on('error', error => {
//       next(error);
//     });

//     stream.on('finish', () => {
//       // The public URL can be used to directly access the file via HTTP.
//       const publicUrl = util.format(`https://storage.googleapis.com/${bucket.name}/${req.params.workId}_${media.name}`);
//       res.status(200).json(publicUrl);
//       // stream.pipe(publicUrl);
//     });
//   });
// };

module.exports = exports;
