const express = require('express');
const jwt = require('jsonwebtoken');

const database = require('../database');
const { login, register, verifyregistration } = require('../controllers/auth');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/verifyregistration', verifyregistration);

module.exports = router;
