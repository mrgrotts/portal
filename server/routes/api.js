const express = require('express');

const {
  restAPI,
  usersAPI,
  locationsAPI,
  ticketsAPI
} = require('../controllers/api');

const router = express.Router();

router.get('/', restAPI);
router.get('/users', usersAPI);
router.get('/locations', locationsAPI);
router.get('/tickets', ticketsAPI);

module.exports = router;
