const database = require("../database");

exports.readCompanies = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate("users")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate("company")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");

  let locations = await database.Locations.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("tickets")
    .populate("invoices");

  let tickets = await database.Tickets.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location");

  let invoices = await database.Invoices.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location")
    .populate("ticket");
};

exports.createCompany = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate("users")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate("company")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");

  let locations = await database.Locations.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("tickets")
    .populate("invoices");

  let tickets = await database.Tickets.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location");

  let invoices = await database.Invoices.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location")
    .populate("ticket");
};

exports.readCompany = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate("users")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate("company")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");

  let locations = await database.Locations.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("tickets")
    .populate("invoices");

  let tickets = await database.Tickets.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location");

  let invoices = await database.Invoices.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location")
    .populate("ticket");
};

exports.updateCompany = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate("users")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate("company")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");

  let locations = await database.Locations.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("tickets")
    .populate("invoices");

  let tickets = await database.Tickets.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location");

  let invoices = await database.Invoices.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location")
    .populate("ticket");
};

exports.deleteCompany = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate("users")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate("company")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");

  let locations = await database.Locations.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("tickets")
    .populate("invoices");

  let tickets = await database.Tickets.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location");

  let invoices = await database.Invoices.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location")
    .populate("ticket");
};

exports.readCompanyUsers = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate("users")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate("company")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");

  let locations = await database.Locations.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("tickets")
    .populate("invoices");

  let tickets = await database.Tickets.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location");

  let invoices = await database.Invoices.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location")
    .populate("ticket");
};

exports.createCompanyUser = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate("users")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate("company")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");

  let locations = await database.Locations.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("tickets")
    .populate("invoices");

  let tickets = await database.Tickets.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location");

  let invoices = await database.Invoices.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location")
    .populate("ticket");
};

exports.readCompanyUser = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate("users")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate("company")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");

  let locations = await database.Locations.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("tickets")
    .populate("invoices");

  let tickets = await database.Tickets.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location");

  let invoices = await database.Invoices.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location")
    .populate("ticket");
};

exports.updateCompanyUsers = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate("users")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate("company")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");

  let locations = await database.Locations.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("tickets")
    .populate("invoices");

  let tickets = await database.Tickets.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location");

  let invoices = await database.Invoices.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location")
    .populate("ticket");
};

exports.deleteCompanyUsers = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate("users")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate("company")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");

  let locations = await database.Locations.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("tickets")
    .populate("invoices");

  let tickets = await database.Tickets.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location");

  let invoices = await database.Invoices.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location")
    .populate("ticket");
};

exports.readCompanyTickets = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate("users")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate("company")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");

  let locations = await database.Locations.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("tickets")
    .populate("invoices");

  let tickets = await database.Tickets.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location");

  let invoices = await database.Invoices.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location")
    .populate("ticket");
};

exports.createCompanyTicket = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate("users")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate("company")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");

  let locations = await database.Locations.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("tickets")
    .populate("invoices");

  let tickets = await database.Tickets.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location");

  let invoices = await database.Invoices.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location")
    .populate("ticket");
};

exports.readCompanyTicket = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate("users")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate("company")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");

  let locations = await database.Locations.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("tickets")
    .populate("invoices");

  let tickets = await database.Tickets.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location");

  let invoices = await database.Invoices.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location")
    .populate("ticket");
};

exports.updateCompanyTicket = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate("users")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate("company")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");

  let locations = await database.Locations.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("tickets")
    .populate("invoices");

  let tickets = await database.Tickets.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location");

  let invoices = await database.Invoices.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location")
    .populate("ticket");
};

exports.deleteCompanyTicket = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate("users")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate("company")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");

  let locations = await database.Locations.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("tickets")
    .populate("invoices");

  let tickets = await database.Tickets.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location");

  let invoices = await database.Invoices.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location")
    .populate("ticket");
};

exports.readCompanyInvoices = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate("users")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate("company")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");

  let locations = await database.Locations.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("tickets")
    .populate("invoices");

  let tickets = await database.Tickets.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location");

  let invoices = await database.Invoices.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location")
    .populate("ticket");
};

exports.createCompanyInvoice = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate("users")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate("company")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");

  let locations = await database.Locations.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("tickets")
    .populate("invoices");

  let tickets = await database.Tickets.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location");

  let invoices = await database.Invoices.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location")
    .populate("ticket");
};

exports.readCompanyInvoice = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate("users")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate("company")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");

  let locations = await database.Locations.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("tickets")
    .populate("invoices");

  let tickets = await database.Tickets.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location");

  let invoices = await database.Invoices.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location")
    .populate("ticket");
};

exports.updateCompanyInvoice = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate("users")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate("company")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");

  let locations = await database.Locations.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("tickets")
    .populate("invoices");

  let tickets = await database.Tickets.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location");

  let invoices = await database.Invoices.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location")
    .populate("ticket");
};

exports.deleteCompanyInvoice = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate("users")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate("company")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");

  let locations = await database.Locations.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("tickets")
    .populate("invoices");

  let tickets = await database.Tickets.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location");

  let invoices = await database.Invoices.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location")
    .populate("ticket");
};

exports.readCompanyLocations = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate("users")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate("company")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");

  let locations = await database.Locations.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("tickets")
    .populate("invoices");

  let tickets = await database.Tickets.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location");

  let invoices = await database.Invoices.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location")
    .populate("ticket");
};

exports.createCompanyLocation = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate("users")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate("company")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");

  let locations = await database.Locations.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("tickets")
    .populate("invoices");

  let tickets = await database.Tickets.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location");

  let invoices = await database.Invoices.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location")
    .populate("ticket");
};

exports.readCompanyLocation = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate("users")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate("company")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");

  let locations = await database.Locations.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("tickets")
    .populate("invoices");

  let tickets = await database.Tickets.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location");

  let invoices = await database.Invoices.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location")
    .populate("ticket");
};

exports.updateCompanyLocations = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate("users")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate("company")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");

  let locations = await database.Locations.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("tickets")
    .populate("invoices");

  let tickets = await database.Tickets.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location");

  let invoices = await database.Invoices.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location")
    .populate("ticket");
};
exports.deleteCompanyLocation = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate("users")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate("company")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");

  let locations = await database.Locations.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("tickets")
    .populate("invoices");

  let tickets = await database.Tickets.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location");

  let invoices = await database.Invoices.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location")
    .populate("ticket");
};

exports.readCompanyLocationTickets = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate("users")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate("company")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");

  let locations = await database.Locations.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("tickets")
    .populate("invoices");

  let tickets = await database.Tickets.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location");

  let invoices = await database.Invoices.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location")
    .populate("ticket");
};

exports.createCompanyLocationTicket = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate("users")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate("company")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");

  let locations = await database.Locations.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("tickets")
    .populate("invoices");

  let tickets = await database.Tickets.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location");

  let invoices = await database.Invoices.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location")
    .populate("ticket");
};

exports.readCompanyLocationTicket = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate("users")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate("company")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");

  let locations = await database.Locations.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("tickets")
    .populate("invoices");

  let tickets = await database.Tickets.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location");

  let invoices = await database.Invoices.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location")
    .populate("ticket");
};

exports.updateCompanyLocationTickets = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate("users")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate("company")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");

  let locations = await database.Locations.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("tickets")
    .populate("invoices");

  let tickets = await database.Tickets.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location");

  let invoices = await database.Invoices.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location")
    .populate("ticket");
};

exports.deleteCompanyLocationTicket = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate("users")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate("company")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");

  let locations = await database.Locations.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("tickets")
    .populate("invoices");

  let tickets = await database.Tickets.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location");

  let invoices = await database.Invoices.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location")
    .populate("ticket");
};

exports.readCompanyLocationInvoices = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate("users")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate("company")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");

  let locations = await database.Locations.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("tickets")
    .populate("invoices");

  let tickets = await database.Tickets.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location");

  let invoices = await database.Invoices.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location")
    .populate("ticket");
};

exports.createCompanyLocationInvoice = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate("users")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate("company")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");

  let locations = await database.Locations.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("tickets")
    .populate("invoices");

  let tickets = await database.Tickets.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location");

  let invoices = await database.Invoices.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location")
    .populate("ticket");
};

exports.readCompanyLocationInvoice = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate("users")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate("company")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");

  let locations = await database.Locations.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("tickets")
    .populate("invoices");

  let tickets = await database.Tickets.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location");

  let invoices = await database.Invoices.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location")
    .populate("ticket");
};

exports.updateCompanyLocationInvoice = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate("users")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate("company")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");

  let locations = await database.Locations.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("tickets")
    .populate("invoices");

  let tickets = await database.Tickets.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location");

  let invoices = await database.Invoices.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location")
    .populate("ticket");
};

exports.deleteCompanyLocationInvoice = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate("users")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate("company")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");

  let locations = await database.Locations.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("tickets")
    .populate("invoices");

  let tickets = await database.Tickets.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location");

  let invoices = await database.Invoices.find({ company: company._id })
    .populate("company")
    .populate("userId")
    .populate("location")
    .populate("ticket");
};

// exports.readCompanyTickets = async (req, res, next) => {
//   let user = await database.Users.findById(req.params.userId);
//   console.log(user);
//   let tickets = [];

//   switch (user.role) {
//     case "Super Admin":
//       tickets = await database.Tickets.find();
//     case "Owner":
//       tickets = await database.Tickets.find({ company: user.company })
//         .populate("userId")
//         .populate("company")
//         .populate("location")
//         .populate("team");
//     case "Admin":
//       tickets = await database.Tickets.find({ company: user.company })
//         .populate("userId")
//         .populate("company")
//         .populate("location")
//         .populate("team");
//     case "User":
//       tickets = await database.Tickets.find({
//         company: user.company,
//         $match: { team: user._id }
//       })
//         .populate("userId")
//         .populate("company")
//         .populate("location")
//         .populate("team");
//     default:
//       tickets = await database.Tickets.find({ company: user.company })
//         .populate("userId")
//         .populate("company")
//         .populate("location")
//         .populate("team");
//   }

//   console.log(tickets);
//   return res.status(200).json(tickets);
// };
