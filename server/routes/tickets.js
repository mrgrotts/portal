const express = require('express');

const database = require('../database');
const {
  readTickets,
  createTicket,
  readTicket,
  updateTicket,
  deleteTicket
} = require('../controllers/tickets');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(readTickets)
  .post(createTicket);

router
  .route('/:id')
  .get(readTicket)
  .put(updateTicket)
  .delete(deleteTicket);

module.exports = router;
