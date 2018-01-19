const express = require('express');

const {
  getAdmins,
  createAdmin,
  readAdmin,
  updateAdmin,
  deleteAdmin,
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
  getTickets,
  createTicket,
  readTicket,
  updateTicket,
  deleteTicket
} = require('../controllers/admins');

const router = express.Router();

router
  .route('/admins')
  .get(getAdmins)
  .post(createAdmin);

router
  .route('/admins/:adminId')
  .get(readAdmin)
  .put(updateAdmin)
  .delete(deleteAdmin);

router
  .route('/users')
  .get(getUsers)
  .post(createUser);

router
  .route('/users/:id')
  .get(readUser)
  .put(updateUser)
  .delete(deleteUser);

router
  .route('/locations')
  .get(getLocations)
  .post(createLocation);

router
  .route('/locations/:id')
  .get(readLocation)
  .put(updateLocation)
  .delete(deleteLocation);

router
  .route('/tickets')
  .get(getTickets)
  .post(createTicket);

router
  .route('/tickets/:id')
  .get(readTicket)
  .put(updateTicket)
  .delete(deleteTicket);

module.exports = router;
