// https://stackoverflow.com/questions/11904159/automatically-remove-referencing-objects-on-deletion-in-mongodb
const database = require('../database');

exports.readCompanies = async (req, res, next) => {
  try {
    const companies = await database.Companies.findById(req.params.companyId)
      .populate('owner')
      .populate('users')
      .populate('locations')
      .populate('work')
      .populate('invoices');

    res.json(companies);
    console.log(companies);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
};

/* MARK BEGIN */
exports.createCompany = async (req, res, next) => {
  const newCompany = {
    owner: req.params.userId,
    name: req.body.name,
    domain: req.body.domain,
    phone: req.body.phone
  };

  try {
    const company = await database.Companies.create(newCompany);
    const user = await database.Users.findById(req.params.userId);

    company.users.push(user._id);
    company.save();

    user.company = company._id;
    user.save();

    const result = await database.Companies.findById(company._id)
      .populate('owner')
      .populate('users');

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
};

exports.readCompany = async (req, res, next) => {
  try {
    const company = await database.Companies.findById(req.params.companyId);

    return res.json(company);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
};

exports.updateCompany = async (req, res, next) => {
  try {
    const company = await database.Companies.findByIdAndUpdate(req.params.companyId, req.body, { new: true })
      .populate('owner')
      .populate('users')
      .populate('locations')
      .populate('work')
      .populate('invoices');

    return res.status(200).json(company);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
};

exports.deleteCompany = async (req, res, next) => {
  try {
    const company = await database.Companies.findByIdAndRemove(req.params.companyId);

    return res.json(company);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
};

exports.readCompanyUsers = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate('users')
    .populate('locations')
    .populate('work')
    .populate('invoices');
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate('company')
    .populate('locations')
    .populate('work')
    .populate('invoices');

  let locations = await database.Locations.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location')
    .populate('work');
};

exports.createCompanyUser = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate('users')
    .populate('locations')
    .populate('work')
    .populate('invoices');
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate('company')
    .populate('locations')
    .populate('work')
    .populate('invoices');

  let locations = await database.Locations.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location')
    .populate('work');
};

exports.readCompanyUser = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate('users')
    .populate('locations')
    .populate('work')
    .populate('invoices');
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate('company')
    .populate('locations')
    .populate('work')
    .populate('invoices');

  let locations = await database.Locations.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location')
    .populate('work');
};

exports.updateCompanyUser = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate('users')
    .populate('locations')
    .populate('work')
    .populate('invoices');
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate('company')
    .populate('locations')
    .populate('work')
    .populate('invoices');

  let locations = await database.Locations.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location')
    .populate('work');
};

exports.deleteCompanyUser = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate('users')
    .populate('locations')
    .populate('work')
    .populate('invoices');
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate('company')
    .populate('locations')
    .populate('work')
    .populate('invoices');

  let locations = await database.Locations.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location')
    .populate('work');
};
/* MARK */
exports.readCompanyWorkList = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate('users')
    .populate('locations')
    .populate('work')
    .populate('invoices');
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate('company')
    .populate('locations')
    .populate('work')
    .populate('invoices');

  let locations = await database.Locations.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location')
    .populate('work');
};

exports.createCompanyWork = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate('users')
    .populate('locations')
    .populate('work')
    .populate('invoices');
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate('company')
    .populate('locations')
    .populate('work')
    .populate('invoices');

  let locations = await database.Locations.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location')
    .populate('work');
};

exports.readCompanyWork = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate('users')
    .populate('locations')
    .populate('work')
    .populate('invoices');
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate('company')
    .populate('locations')
    .populate('work')
    .populate('invoices');

  let locations = await database.Locations.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location')
    .populate('work');
};

exports.updateCompanyWork = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate('users')
    .populate('locations')
    .populate('work')
    .populate('invoices');
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate('company')
    .populate('locations')
    .populate('work')
    .populate('invoices');

  let locations = await database.Locations.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location')
    .populate('work');
};

exports.deleteCompanyWork = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate('users')
    .populate('locations')
    .populate('work')
    .populate('invoices');
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate('company')
    .populate('locations')
    .populate('work')
    .populate('invoices');

  let locations = await database.Locations.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location')
    .populate('work');
};

exports.readCompanyWorkUsers = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate('users')
    .populate('locations')
    .populate('work')
    .populate('invoices');
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate('company')
    .populate('locations')
    .populate('work')
    .populate('invoices');

  let locations = await database.Locations.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location')
    .populate('work');
};

exports.createCompanyWorkUser = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate('users')
    .populate('locations')
    .populate('work')
    .populate('invoices');
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate('company')
    .populate('locations')
    .populate('work')
    .populate('invoices');

  let locations = await database.Locations.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location')
    .populate('work');
};

exports.readCompanyWorkUser = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate('users')
    .populate('locations')
    .populate('work')
    .populate('invoices');
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate('company')
    .populate('locations')
    .populate('work')
    .populate('invoices');

  let locations = await database.Locations.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location')
    .populate('work');
};

exports.updateCompanyWorkUser = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate('users')
    .populate('locations')
    .populate('work')
    .populate('invoices');
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate('company')
    .populate('locations')
    .populate('work')
    .populate('invoices');

  let locations = await database.Locations.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location')
    .populate('work');
};

exports.deleteCompanyWorkUser = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate('users')
    .populate('locations')
    .populate('work')
    .populate('invoices');
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate('company')
    .populate('locations')
    .populate('work')
    .populate('invoices');

  let locations = await database.Locations.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location')
    .populate('work');
};

exports.readCompanyInvoices = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate('users')
    .populate('locations')
    .populate('work')
    .populate('invoices');
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate('company')
    .populate('locations')
    .populate('work')
    .populate('invoices');

  let locations = await database.Locations.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location')
    .populate('work');
};

exports.createCompanyInvoice = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate('users')
    .populate('locations')
    .populate('work')
    .populate('invoices');
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate('company')
    .populate('locations')
    .populate('work')
    .populate('invoices');

  let locations = await database.Locations.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location')
    .populate('work');
};

exports.readCompanyInvoice = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate('users')
    .populate('locations')
    .populate('work')
    .populate('invoices');
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate('company')
    .populate('locations')
    .populate('work')
    .populate('invoices');

  let locations = await database.Locations.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location')
    .populate('work');
};

exports.updateCompanyInvoice = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate('users')
    .populate('locations')
    .populate('work')
    .populate('invoices');
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate('company')
    .populate('locations')
    .populate('work')
    .populate('invoices');

  let locations = await database.Locations.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location')
    .populate('work');
};

exports.deleteCompanyInvoice = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate('users')
    .populate('locations')
    .populate('work')
    .populate('invoices');
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate('company')
    .populate('locations')
    .populate('work')
    .populate('invoices');

  let locations = await database.Locations.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location')
    .populate('work');
};

exports.readCompanyLocations = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate('users')
    .populate('locations')
    .populate('work')
    .populate('invoices');
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate('company')
    .populate('locations')
    .populate('work')
    .populate('invoices');

  let locations = await database.Locations.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location')
    .populate('work');
};

exports.createCompanyLocation = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate('users')
    .populate('locations')
    .populate('work')
    .populate('invoices');
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate('company')
    .populate('locations')
    .populate('work')
    .populate('invoices');

  let locations = await database.Locations.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location')
    .populate('work');
};

exports.readCompanyLocation = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate('users')
    .populate('locations')
    .populate('work')
    .populate('invoices');
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate('company')
    .populate('locations')
    .populate('work')
    .populate('invoices');

  let locations = await database.Locations.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location')
    .populate('work');
};

exports.updateCompanyLocation = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate('users')
    .populate('locations')
    .populate('work')
    .populate('invoices');
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate('company')
    .populate('locations')
    .populate('work')
    .populate('invoices');

  let locations = await database.Locations.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location')
    .populate('work');
};
exports.deleteCompanyLocation = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate('users')
    .populate('locations')
    .populate('work')
    .populate('invoices');
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate('company')
    .populate('locations')
    .populate('work')
    .populate('invoices');

  let locations = await database.Locations.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location')
    .populate('work');
};

exports.readCompanyLocationsUsers = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate('users')
    .populate('locations')
    .populate('work')
    .populate('invoices');
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate('company')
    .populate('locations')
    .populate('work')
    .populate('invoices');

  let locations = await database.Locations.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location')
    .populate('work');
};

exports.createCompanyLocationUser = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate('users')
    .populate('locations')
    .populate('work')
    .populate('invoices');
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate('company')
    .populate('locations')
    .populate('work')
    .populate('invoices');

  let locations = await database.Locations.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location')
    .populate('work');
};

exports.readCompanyLocationUser = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate('users')
    .populate('locations')
    .populate('work')
    .populate('invoices');
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate('company')
    .populate('locations')
    .populate('work')
    .populate('invoices');

  let locations = await database.Locations.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location')
    .populate('work');
};

exports.updateCompanyLocationUser = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate('users')
    .populate('locations')
    .populate('work')
    .populate('invoices');
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate('company')
    .populate('locations')
    .populate('work')
    .populate('invoices');

  let locations = await database.Locations.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location')
    .populate('work');
};

exports.deleteCompanyLocationUser = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate('users')
    .populate('locations')
    .populate('work')
    .populate('invoices');
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate('company')
    .populate('locations')
    .populate('work')
    .populate('invoices');

  let locations = await database.Locations.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location')
    .populate('work');
};

exports.readCompanyLocationWorkList = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate('users')
    .populate('locations')
    .populate('work')
    .populate('invoices');
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate('company')
    .populate('locations')
    .populate('work')
    .populate('invoices');

  let locations = await database.Locations.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location')
    .populate('work');
};

exports.createCompanyLocationWork = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate('users')
    .populate('locations')
    .populate('work')
    .populate('invoices');
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate('company')
    .populate('locations')
    .populate('work')
    .populate('invoices');

  let locations = await database.Locations.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location')
    .populate('work');
};

exports.readCompanyLocationWork = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate('users')
    .populate('locations')
    .populate('work')
    .populate('invoices');
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate('company')
    .populate('locations')
    .populate('work')
    .populate('invoices');

  let locations = await database.Locations.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location')
    .populate('work');
};

exports.updateCompanyLocationWork = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate('users')
    .populate('locations')
    .populate('work')
    .populate('invoices');
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate('company')
    .populate('locations')
    .populate('work')
    .populate('invoices');

  let locations = await database.Locations.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location')
    .populate('work');
};

exports.deleteCompanyLocationWork = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate('users')
    .populate('locations')
    .populate('work')
    .populate('invoices');
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate('company')
    .populate('locations')
    .populate('work')
    .populate('invoices');

  let locations = await database.Locations.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location')
    .populate('work');
};

exports.readCompanyLocationInvoices = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate('users')
    .populate('locations')
    .populate('work')
    .populate('invoices');
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate('company')
    .populate('locations')
    .populate('work')
    .populate('invoices');

  let locations = await database.Locations.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location')
    .populate('work');
};

exports.createCompanyLocationInvoice = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate('users')
    .populate('locations')
    .populate('work')
    .populate('invoices');
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate('company')
    .populate('locations')
    .populate('work')
    .populate('invoices');

  let locations = await database.Locations.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location')
    .populate('work');
};

exports.readCompanyLocationInvoice = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate('users')
    .populate('locations')
    .populate('work')
    .populate('invoices');
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate('company')
    .populate('locations')
    .populate('work')
    .populate('invoices');

  let locations = await database.Locations.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location')
    .populate('work');
};

exports.updateCompanyLocationInvoice = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate('users')
    .populate('locations')
    .populate('work')
    .populate('invoices');
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate('company')
    .populate('locations')
    .populate('work')
    .populate('invoices');

  let locations = await database.Locations.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location')
    .populate('work');
};

exports.deleteCompanyLocationInvoice = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate('users')
    .populate('locations')
    .populate('work')
    .populate('invoices');
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate('company')
    .populate('locations')
    .populate('work')
    .populate('invoices');

  let locations = await database.Locations.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location')
    .populate('work');
};

exports.readCompanyLocationWorkUsers = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate('users')
    .populate('locations')
    .populate('work')
    .populate('invoices');
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate('company')
    .populate('locations')
    .populate('work')
    .populate('invoices');

  let locations = await database.Locations.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location')
    .populate('work');
};

exports.createCompanyLocationUserWorkUser = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate('users')
    .populate('locations')
    .populate('work')
    .populate('invoices');
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate('company')
    .populate('locations')
    .populate('work')
    .populate('invoices');

  let locations = await database.Locations.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location')
    .populate('work');
};

exports.readCompanyLocationWorkUser = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate('users')
    .populate('locations')
    .populate('work')
    .populate('invoices');
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate('company')
    .populate('locations')
    .populate('work')
    .populate('invoices');

  let locations = await database.Locations.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location')
    .populate('work');
};

exports.updateCompanyLocationWorkUser = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate('users')
    .populate('locations')
    .populate('work')
    .populate('invoices');
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate('company')
    .populate('locations')
    .populate('work')
    .populate('invoices');

  let locations = await database.Locations.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location')
    .populate('work');
};

exports.deleteCompanyLocationWorkUser = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .populate('users')
    .populate('locations')
    .populate('work')
    .populate('invoices');
  console.log(company);

  let users = await database.Users.find({ company: company._id })
    .populate('company')
    .populate('locations')
    .populate('work')
    .populate('invoices');

  let locations = await database.Locations.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('owner')
    .populate('location')
    .populate('work');
};

module.exports = exports;

// exports.readCompanyWorkList = async (req, res, next) => {
//   let user = await database.Users.findById(req.params.userId);
//   console.log(user);
//   let work = [];

//   switch (user.role) {
//     case "Super Admin":
//       work = await database.Work.find();
//     case "Owner":
//       work = await database.Work.find({ company: user.company })
//         .populate("owner")
//         .populate("company")
//         .populate("location")
//         .populate("team");
//     case "Admin":
//       work = await database.Work.find({ company: user.company })
//         .populate("owner")
//         .populate("company")
//         .populate("location")
//         .populate("team");
//     case "User":
//       work = await database.Work.find({
//         company: user.company,
//         $match: { team: user._id }
//       })
//         .populate("owner")
//         .populate("company")
//         .populate("location")
//         .populate("team");
//     default:
//       work = await database.Work.find({ company: user.company })
//         .populate("owner")
//         .populate("company")
//         .populate("location")
//         .populate("team");
//   }

//   console.log(work);
//   return res.status(200).json(work);
// };
