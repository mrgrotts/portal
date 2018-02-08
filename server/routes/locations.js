const express = require("express");

const database = require("../database");
const {
  readLocations,
  createLocation,
  readLocation,
  updateLocation,
  deleteLocation
} = require("../controllers/locations");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(readLocations)
  .post(createLocation);

router
  .route("/:locationId")
  .get(readLocation)
  .put(updateLocation)
  .delete(deleteLocation);

module.exports = router;
