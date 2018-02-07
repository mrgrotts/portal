const express = require("express");

const database = require("../database");
const {
  readCompanies,
  createCompany,
  readCompany,
  updateCompany,
  deleteCompany,
  readCompanyUsers,
  createCompanyUser,
  readCompanyUser,
  updateCompanyUsers,
  deleteCompanyUsers,
  readCompanyTickets,
  createCompanyTicket,
  readCompanyTicket,
  updateCompanyTicket,
  deleteCompanyTicket,
  readCompanyInvoices,
  createCompanyInvoice,
  readCompanyInvoice,
  updateCompanyInvoice,
  deleteCompanyInvoice,
  readCompanyLocations,
  createCompanyLocation,
  readCompanyLocation,
  updateCompanyLocation,
  deleteCompanyLocation,
  readCompanyLocationTickets,
  createCompanyLocationTicket,
  readCompanyLocationTicket,
  updateCompanyLocationTicket,
  deleteCompanyLocationTicket,
  readCompanyLocationInvoices,
  createCompanyLocationInvoice,
  readCompanyLocationInvoice,
  updateCompanyLocationInvoice,
  deleteCompanyLocationInvoice
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

router
  .route("/:companyId/users")
  .get(readCompanyUsers)
  .post(createCompanyUser);

router
  .route("/:companyId/users/:userId")
  .get(readCompanyUser)
  .put(updateCompanyUser)
  .delete(deleteCompanyUser);

router
  .route("/:companyId/tickets")
  .get(readCompanyTickets)
  .post(createCompanyTicket);

router
  .route("/:companyId/tickets/:ticketId")
  .get(readCompanyTicket)
  .put(updateCompanyTicket)
  .delete(deleteCompanyTicket);

router
  .route("/:companyId/invoices")
  .get(readCompanyInvoices)
  .post(createCompanyInvoice);

router
  .route("/:companyId/invoices/:invoiceId")
  .get(readCompanyInvoice)
  .put(updateCompanyInvoice)
  .delete(deleteCompanyInvoice);

router
  .route("/:companyId/locations")
  .get(readCompanyLocations)
  .post(createCompanyLocation);

router
  .route("/:companyId/locations/:locationId")
  .get(readCompanyLocation)
  .put(updateCompanyLocation)
  .delete(deleteCompanyLocation);

router
  .route("/:companyId/locations/:locationId/tickets")
  .get(readCompanyLocationTickets)
  .post(createCompanyLocationTicket);

router
  .route("/:companyId/locations/:locationId/tickets/:ticketId")
  .get(readCompanyLocationTicket)
  .put(updateCompanyLocationTickets)
  .delete(deleteCompanyLocationTicket);

router
  .route("/:companyId/locations/:locationId/invoices")
  .get(readCompanyLocationTickets)
  .post(createCompanyLocationTicket);

router
  .route("/:companyId/locations/:locationId/invoices/:invoiceId")
  .get(readCompanyLocationInvoice)
  .put(updateCompanyLocationInvoice)
  .delete(deleteCompanyLocationInvoice);

module.exports = router;
