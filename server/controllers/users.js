const database = require("../database");

exports.readUsers = async (req, res, next) => {
  let company = await database.Companies.find({ company: company._id })
    .populate("users")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");

  let user = await database.Users.find({ company: company._id })
    .populate("company")
    .populate("locations")
    .populate("tickets");
};

exports.createUser = async (req, res, next) => {
  let company = await database.Companies.find({ company: company._id })
    .populate("users")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");

  let user = await database.Users.find({ company: company._id })
    .populate("company")
    .populate("locations")
    .populate("tickets");
};

exports.readUser = (req, res, next) => {
  try {
    // console.log("[PARAMS]", req.params.userId);
    database.Users.findById(req.params.userId)
      .populate("locations")
      .populate("tickets")
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
    .populate("users")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");

  let user = await database.Users.find({ company: company._id })
    .populate("company")
    .populate("locations")
    .populate("tickets");
};

exports.deleteUser = async (req, res, next) => {
  let company = await database.Companies.find({ company: company._id })
    .populate("users")
    .populate("locations")
    .populate("tickets")
    .populate("invoices");

  let user = await database.Users.find({ company: company._id })
    .populate("company")
    .populate("locations")
    .populate("tickets");
};
