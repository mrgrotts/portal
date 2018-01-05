const express = require('express');

const database = require('../database');
const tickets = require('../controllers/tickets');

const router = express.Router({ mergeParams: true });

router.post('/', tickets.createTicket);

module.exports = router;
