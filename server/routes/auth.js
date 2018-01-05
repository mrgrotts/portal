const express = require('express');
const jwt = require('jsonwebtoken');

const database = require('../database');
const auth = require('../controllers/auth');

const router = express.Router();

router.post('/login', auth.login);
router.post('/register', auth.register);

module.exports = router;
