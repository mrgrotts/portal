const express = require("express");

const database = require("../database");
const {
  readCompanyTickets,
  readCompanies,
  createCompany,
  readCompany,
  updateCompany,
  deleteCompany
} = require("../controllers/companies");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(readCompanies)
  .post(createCompany);

router
  .route("/:companyId")
  .get(readCompany)
  .put(updateCompany)
  .delete(deleteCompany);

module.exports = router;
