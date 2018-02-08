const express = require('express');

const database = require('../database');
const {
  readWorkList,
  createWork,
  readWork,
  updateWork,
  deleteWork
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

module.exports = router;
