const express = require('express');

const database = require('../database');
const {
  readCustomers,
  createCustomer,
  readCustomer,
  updateCustomer,
  deleteCustomer
} = require('../controllers/customers');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(readCustomers)
  .post(createCustomer);

router
  .route('/:customerId')
  .get(readCustomer)
  .put(updateCustomer)
  .delete(deleteCustomer);

module.exports = router;
