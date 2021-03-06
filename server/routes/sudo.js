const express = require('express');

const {
  getUsers,
  createUser,
  readUser,
  updateUser,
  deleteUser,
  getLocations,
  createLocation,
  readLocation,
  updateLocation,
  deleteLocation,
  getWorkList,
  createWork,
  readWork,
  updateWork,
  deleteWork
} = require('../controllers/sudo');

const router = express.Router();

router
  .route('/users')
  .get(getUsers)
  .post(createUser);

router
  .route('/users/:userId')
  .get(readUser)
  .put(updateUser)
  .delete(deleteUser);

router
  .route('/locations')
  .get(getLocations)
  .post(createLocation);

router
  .route('/locations/:locationId')
  .get(readLocation)
  .put(updateLocation)
  .delete(deleteLocation);

router
  .route('/work')
  .get(getWorkList)
  .post(createWork);

router
  .route('/work/:workId')
  .get(readWork)
  .put(updateWork)
  .delete(deleteWork);

module.exports = router;
