// https://stackoverflow.com/questions/11904159/automatically-remove-referencing-objects-on-deletion-in-mongodb
const database = require('../database');

exports.readUsers = async (req, res, next) => {
  let company = await database.Companies.find({ company: company._id })
    .populate('users')
    .populate('locations')
    .populate('work')
    .populate('invoices');

  let user = await database.Users.find({ company: company._id })
    .populate('company')
    .populate('locations')
    .populate('work');
};

exports.createUser = async (req, res, next) => {
  let company = await database.Companies.find({ company: company._id })
    .populate('users')
    .populate('locations')
    .populate('work')
    .populate('invoices');

  let user = await database.Users.find({ company: company._id })
    .populate('company')
    .populate('locations')
    .populate('work');
};

exports.readUser = (req, res, next) => {
  try {
    // console.log("[PARAMS]", req.params.userId);
    database.Users.findById(req.params.userId)
      .populate('locations')
      .populate('work')
      .then(user => {
        res.json(user);
        next();
      })
      .catch(next);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

exports.updateUser = async (req, res, next) => {
  let company = await database.Companies.find({ company: company._id })
    .populate('users')
    .populate('locations')
    .populate('work')
    .populate('invoices');

  let user = await database.Users.find({ company: company._id })
    .populate('company')
    .populate('locations')
    .populate('work');
};

exports.deleteUser = async (req, res, next) => {
  let company = await database.Companies.find({ company: company._id })
    .populate('users')
    .populate('locations')
    .populate('work')
    .populate('invoices');

  let user = await database.Users.find({ company: company._id })
    .populate('company')
    .populate('locations')
    .populate('work');
};
