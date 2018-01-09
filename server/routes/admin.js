const express = require('express');

const { getUsers, getLocations, getTickets } = require('../controllers/admin');

const router = express.Router();

router.get('/users', getUsers);
router.get('/locations', getLocations);
router.get('/tickets', getTickets);

module.exports = router;
