const express = require("express");

const database = require("../database");
const {
  readUsers,
  createUser,
  readUser,
  updateUser,
  deleteUser
} = require("../controllers/users");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(readUsers)
  .post(createUser);

router
  .route("/:userId")
  .get(readUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
