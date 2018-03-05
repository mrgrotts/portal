const express = require('express');
const bodyParser = require('body-parser');

const {
  readWorkList,
  createWork,
  readWork,
  updateWork,
  deleteWork,
  readWorkMedia,
  updateWorkMedia,
  readWorkMediaFile,
  deleteWorkMediaFile
} = require('../controllers/work');

const database = require('../database');
const media = require('../services/media');

const router = express.Router();

// Automatically parse request body as form data for these routes
router.use(bodyParser.urlencoded({ extended: false }));

// Set Content-Type for all responses for these routes
router.use((req, res, next) => {
  // res.set('Content-Type', 'application/json; charset=utf-8');
  res.set('Content-Type', 'text/html');
  next();
});

router
  .route('/')
  .get(readWorkMedia)
  .post(
    media.multer.single('media'),
    media.streamUploadToGoogleCloudStorage,
    updateWorkMedia
  );

router
  .route('/:mediaId')
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
