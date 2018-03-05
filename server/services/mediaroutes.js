'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const media = require('./media');

const router = express.Router({ mergeParams: true });

// Automatically parse request body as form data for these routes
router.use(bodyParser.urlencoded({ extended: false }));

// Set Content-Type for all responses for these routes
router.use((req, res, next) => {
  res.set('Content-Type', 'application/json; charset=utf-8');
  next();
});

router
  .route('/:workId/media')
  .get(readWorkMedia)
  .post(
    media.multer.single('media'),
    media.streamUploadToGoogleCloudStorage,
    updateWorkMedia
  );

router
  .route('/:workId/media/:mediaId')
  .get(readWorkMediaFile)
  .post(
    media.multer.single('media'),
    media.streamUploadToGoogleCloudStorage,
    deleteWorkMediaFile
  );

router.use((error, req, res, next) => {
  // Format error and forward to generic error handler for logging and
  // responding to the request
  error.response = error.message;
  next(error);
});

module.exports = router;
