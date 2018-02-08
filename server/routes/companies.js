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
  updateCompanyUser,
  deleteCompanyUser,
  readCompanyWorkList,
  createCompanyWork,
  readCompanyWork,
  updateCompanyWork,
  deleteCompanyWork,
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
  readCompanyLocationWorkList,
  createCompanyLocationWork,
  readCompanyLocationWork,
  updateCompanyLocationWork,
  deleteCompanyLocationWork,
  readCompanyLocationInvoices,
  createCompanyLocationInvoice,
  readCompanyLocationInvoice,
  updateCompanyLocationInvoice,
  deleteCompanyLocationInvoice,
  readCompanyWorkUsers,
  createCompanyWorkUser,
  readCompanyWorkUser,
  updateCompanyWorkUser,
  deleteCompanyWorkUser,
  readCompanyLocationsUsers,
  createCompanyLocationUser,
  readCompanyLocationUser,
  updateCompanyLocationUser,
  deleteCompanyLocationUser,
  readCompanyLocationWorkUsers,
  createCompanyLocationUserWorkUser,
  readCompanyLocationWorkUser,
  updateCompanyLocationWorkUser,
  deleteCompanyLocationWorkUser
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
  .route("/:companyId/work")
  .get(readCompanyWorkList)
  .post(createCompanyWork);

router
  .route("/:companyId/work/:workId")
  .get(readCompanyWork)
  .put(updateCompanyWork)
  .delete(deleteCompanyWork);

router
  .route("/:companyId/work/companyUsers")
  .get(readCompanyWorkUsers)
  .post(createCompanyWorkUser);

router
  .route("/:companyId/work/:workId/companyUsers/:companyUserId")
  .get(readCompanyWorkUser)
  .put(updateCompanyWorkUser)
  .delete(deleteCompanyWorkUser);

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
  .route("/:companyId/locations/:locationId/work")
  .get(readCompanyLocationWorkList)
  .post(createCompanyLocationWork);

router
  .route("/:companyId/locations/:locationId/work/:workId")
  .get(readCompanyLocationWork)
  .put(updateCompanyLocationWork)
  .delete(deleteCompanyLocationWork);

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
  .route("/:companyId/locations/:locationId/work/:workId/companyUsers")
  .get(readCompanyLocationWorkUsers)
  .post(createCompanyLocationUserWorkUser);

router
  .route(
    "/:companyId/locations/:locationId/work/:workId/companyUsers/:companyUserId"
  )
  .get(readCompanyLocationWorkUser)
  .put(updateCompanyLocationWorkUser)
  .delete(deleteCompanyLocationWorkUser);

module.exports = router;
