const express = require('express');

const { restAPI, companiesAPI, usersAPI, locationsAPI, workAPI } = require('../controllers/api');

const router = express.Router();

router.get('/', restAPI);
router.get('/companies', companiesAPI);
router.get('/users', usersAPI);
router.get('/locations', locationsAPI);
router.get('/work', workAPI);

module.exports = router;
