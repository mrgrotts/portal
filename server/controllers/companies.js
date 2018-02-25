const database = require('../database');

exports.readCompanies = async (req, res, next) => {
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
    .populate('userId')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location')
    .populate('work');
};
/* MARK BEGIN */
exports.createCompany = async (req, res, next) => {
  //
  const newCompany = {
    userId: req.params.userId,
    name: req.body.name,
    domain: req.body.domain,
    phone: req.body.phone
  };

  database.Companies.create(newCompany)
    .then(company => {
      database.Users.findById(req.params.userId)
        .then(user => {
          user.company = company._id;
          user.save().then(user => {
            database.Companies.findById(company._id)
              .populate('userId')
              .populate('users')
              .then(c => res.status(200).json(c))
              .catch(next);
          });
        })
        .catch(next);
    })
    .catch(next);
};

exports.readCompany = async (req, res, next) => {
  let company = await database.Companies.findById(req.params.companyId)
    .then(company => res.json(company))
    .catch(error => res.send(error));
};

exports.updateCompany = async (req, res, next) => {
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
    .populate('userId')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location')
    .populate('work');
};

exports.deleteCompany = async (req, res, next) => {
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
    .populate('userId')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location')
    .populate('work');
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
    .populate('userId')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('userId')
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
    .populate('userId')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('userId')
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
    .populate('userId')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('userId')
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
    .populate('userId')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('userId')
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
    .populate('userId')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('userId')
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
    .populate('userId')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('userId')
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
    .populate('userId')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('userId')
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
    .populate('userId')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('userId')
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
    .populate('userId')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('userId')
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
    .populate('userId')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('userId')
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
    .populate('userId')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('userId')
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
    .populate('userId')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('userId')
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
    .populate('userId')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('userId')
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
    .populate('userId')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('userId')
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
    .populate('userId')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('userId')
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
    .populate('userId')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('userId')
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
    .populate('userId')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('userId')
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
    .populate('userId')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('userId')
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
    .populate('userId')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('userId')
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
    .populate('userId')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('userId')
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
    .populate('userId')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('userId')
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
    .populate('userId')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('userId')
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
    .populate('userId')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('userId')
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
    .populate('userId')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('userId')
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
    .populate('userId')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('userId')
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
    .populate('userId')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('userId')
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
    .populate('userId')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('userId')
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
    .populate('userId')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('userId')
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
    .populate('userId')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('userId')
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
    .populate('userId')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('userId')
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
    .populate('userId')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('userId')
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
    .populate('userId')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('userId')
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
    .populate('userId')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('userId')
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
    .populate('userId')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('userId')
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
    .populate('userId')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('userId')
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
    .populate('userId')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('userId')
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
    .populate('userId')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('userId')
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
    .populate('userId')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('userId')
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
    .populate('userId')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('userId')
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
    .populate('userId')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('userId')
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
    .populate('userId')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('userId')
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
    .populate('userId')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('userId')
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
    .populate('userId')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('userId')
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
    .populate('userId')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('userId')
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
    .populate('userId')
    .populate('work')
    .populate('invoices');

  let work = await database.Work.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location');

  let invoices = await database.Invoices.find({ company: company._id })
    .populate('company')
    .populate('userId')
    .populate('location')
    .populate('work');
};

// exports.readCompanyWorkList = async (req, res, next) => {
//   let user = await database.Users.findById(req.params.userId);
//   console.log(user);
//   let work = [];

//   switch (user.role) {
//     case "Super Admin":
//       work = await database.Work.find();
//     case "Owner":
//       work = await database.Work.find({ company: user.company })
//         .populate("userId")
//         .populate("company")
//         .populate("location")
//         .populate("team");
//     case "Admin":
//       work = await database.Work.find({ company: user.company })
//         .populate("userId")
//         .populate("company")
//         .populate("location")
//         .populate("team");
//     case "User":
//       work = await database.Work.find({
//         company: user.company,
//         $match: { team: user._id }
//       })
//         .populate("userId")
//         .populate("company")
//         .populate("location")
//         .populate("team");
//     default:
//       work = await database.Work.find({ company: user.company })
//         .populate("userId")
//         .populate("company")
//         .populate("location")
//         .populate("team");
//   }

//   console.log(work);
//   return res.status(200).json(work);
// };
