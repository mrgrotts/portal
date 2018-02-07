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
  deleteCompanyLocationInvoice,
  readCompanyTicketsUsers,
  createCompanyTicketUser,
  readCompanyTicketUser,
  updateCompanyTicketUser,
  deleteCompanyTicketUser,
  readCompanyLocationsUsers,
  createCompanyLocationUser,
  readCompanyLocationUser,
  updateCompanyLocationUser,
  deleteCompanyLocationUser,
  readCompanyLocationTicketUsers,
  createCompanyLocationUserTicketUser,
  readCompanyLocationTicketUser,
  updateCompanyLocationTicketUser,
  deleteCompanyLocationTicketUser
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
  .route("/:companyId/companyUsers")
  .get(readCompanyUsers)
  .post(createCompanyUser);

router
  .route("/:companyId/companyUsers/:companyUserId")
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
  .route("/:companyId/tickets/companyUsers")
  .get(readCompanyTicketsUsers)
  .post(createCompanyTicketUser);

router
  .route("/:companyId/tickets/:ticketId/companyUsers/:companyUserId")
  .get(readCompanyTicketUser)
  .put(updateCompanyTicketUser)
  .delete(deleteCompanyTicketUser);

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
  .route("/:companyId/locations/companyUsers")
  .get(readCompanyLocationsUsers)
  .post(createCompanyLocationUser);

router
  .route("/:companyId/locations/:locationId/companyUsers/:companyUserId")
  .get(readCompanyLocationUser)
  .put(updateCompanyLocationUser)
  .delete(deleteCompanyLocationUser);

router
  .route("/:companyId/locations/:locationId/tickets")
  .get(readCompanyLocationTickets)
  .post(createCompanyLocationTicket);

router
  .route("/:companyId/locations/:locationId/tickets/:ticketId")
  .get(readCompanyLocationTicket)
  .put(updateCompanyLocationTicket)
  .delete(deleteCompanyLocationTicket);

router
  .route("/:companyId/locations/:locationId/invoices")
  .get(readCompanyLocationInvoices)
  .post(createCompanyLocationInvoice);

router
  .route("/:companyId/locations/:locationId/invoices/:invoiceId")
  .get(readCompanyLocationInvoice)
  .put(updateCompanyLocationInvoice)
  .delete(deleteCompanyLocationInvoice);

router
  .route("/:companyId/locations/:locationId/tickets/:ticketId/companyUsers")
  .get(readCompanyLocationTicketUsers)
  .post(createCompanyLocationUserTicketUser);

router
  .route(
    "/:companyId/locations/:locationId/tickets/:ticketId/companyUsers/:companyUserId"
  )
  .get(readCompanyLocationTicketUser)
  .put(updateCompanyLocationTicketUser)
  .delete(deleteCompanyLocationTicketUser);

module.exports = router;
