const express = require('express');
const bodyParser = require('body-parser');

const {
  readWorkList,
  createWork,
  readWork,
  updateWork,
  deleteWork,
  readWorkMedia,
  createWorkMedia,
  updateWorkMedia,
  readWorkMediaFile,
  deleteWorkMediaFile
} = require('../controllers/work');

const database = require('../database');
const media = require('../services/media');

const router = express.Router({ mergeParams: true });

// Automatically parse request body as form data for these routes
router.use(bodyParser.urlencoded({ extended: false }));

// Set Content-Type for all responses for these routes
router.use((req, res, next) => {
  res.set('Content-Type', 'application/json; charset=utf-8');
  // res.set('Content-Type', 'text/html');
  next();
});

router
  .route('/')
  .get(readWorkList)
  .post(createWork);

router
  .route('/:workId')
  .get(readWork)
  .put(updateWork)
  .delete(deleteWork);

router
  .route('/:workId/media')
  // .get(media.multer.any('media'), media.streamDownloadFromGoogleCloudStorage, readWorkMedia)
  .post(media.multer.any('media'), media.streamUploadToGoogleCloudStorage, createWorkMedia);

router
  .route('/:workId/media/:mediaId')
  .get(readWorkMediaFile)
  .put(media.multer.single('media'), media.streamUploadToGoogleCloudStorage, updateWorkMedia)
  .delete(media.multer.single('media'), media.streamUploadToGoogleCloudStorage, deleteWorkMediaFile);

router.use((error, req, res, next) => {
  // Format error and forward to generic error handler for logging and
  // responding to the request
  error.response = error.message;
  next(error);
});

module.exports = router;
