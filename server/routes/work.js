const express = require('express');

const database = require('../database');
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

const router = express.Router({ mergeParams: true });

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
  .get(readWorkMedia)
  .post(updateWorkMedia);

router
  .route('/:workId/media/:mediaId')
  .get(readWorkMediaFile)
  .delete(deleteWorkMediaFile);

module.exports = router;
