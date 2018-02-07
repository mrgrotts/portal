const express = require("express");

const database = require("../database");
const {
  readInvoices,
  createInvoice,
  readInvoice,
  updateInvoice,
  deleteInvoice
} = require("../controllers/invoices");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(readInvoices)
  .post(createInvoice);

router
  .route("/:invoiceId")
  .get(readInvoice)
  .put(updateInvoice)
  .delete(deleteInvoice);

module.exports = router;
