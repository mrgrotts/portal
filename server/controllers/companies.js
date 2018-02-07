const database = require("../database");

exports.readCompanyTickets = async (req, res, next) => {
  let user = await database.Users.findById(req.params.userId);
  console.log(user);
  let tickets = [];

  switch (user.role) {
    case "Super Admin":
      tickets = await database.Tickets.find();
    case "Owner":
      tickets = await database.Tickets.find({ company: user.company })
        .populate("userId")
        .populate("company")
        .populate("location")
        .populate("team");
    case "Admin":
      tickets = await database.Tickets.find({ company: user.company })
        .populate("userId")
        .populate("company")
        .populate("location")
        .populate("team");
    case "User":
      tickets = await database.Tickets.find({
        company: user.company,
        $match: { team: user._id }
      })
        .populate("userId")
        .populate("company")
        .populate("location")
        .populate("team");
    default:
      tickets = await database.Tickets.find({ company: user.company })
        .populate("userId")
        .populate("company")
        .populate("location")
        .populate("team");
  }

  console.log(tickets);
  return res.status(200).json(tickets);
};

exports.readCompanies = (req, res, next) => {
  database.Users.findById(req.params.userId).then(user => {
    if (user.role === "Super Admin") {
      database.Companies.find()
        .sort({ createdAt: "asc" })
        .populate("owner")
        .populate("tickets")
        .populate("headquarters")
        .populate("locations")
        .populate("users")
        .then(companies => res.status(200).json(companies))
        .catch(error => res.send(error));
    } else {
      database.Companies.find({ userId: req.params.userId })
        .sort({ createdAt: "asc" })
        .populate("owner")
        .populate("tickets")
        .populate("headquarters")
        .populate("locations")
        .populate("users")
        .then(companies => res.status(200).json(companies))
        .catch(error => res.send(error));
    }
  });
};

exports.createCompany = (req, res, next) => {
  const newCompany = {
    name: req.body.name,
    owner: req.params.userId,
    headquarters: req.body.headquarters
  };

  database.Companies.create(newCompany)
    .then(customer => {
      database.Users.findById(req.params.userId)
        .then(user => {
          user.companies.push(customer._id);
          user
            .save()
            .then(user =>
              database.Companies.findById(customer._id)
                .populate("owner")
                .populate("tickets")
                .populate("headquarters")
                .populate("locations")
                .populate("users")
            )
            .then(loc => res.status(200).json(loc))
            .catch(next);
        })
        .catch(next);
    })
    .catch(next);
};

exports.readCompany = (req, res, next) => {
  database.Companies.findById(req.params.customerId)
    .populate("owner")
    .populate("tickets")
    .populate("headquarters")
    .populate("locations")
    .populate("users")
    .then(customer => res.json(customer))
    .catch(error => res.send(error));
};

exports.updateCompany = (req, res, next) => {
  const updatedCompany = {
    name: req.body.name,
    owner: req.params.userId,
    headquarters: req.body.headquarters,
    users: req.body.users,
    locations: req.body.locations,
    tickets: req.body.tickets
  };

  database.Companies.findByIdAndUpdate(req.params.customerId, updatedCompany, {
    new: true
  })
    .populate("owner")
    .populate("tickets")
    .populate("headquarters")
    .populate("locations")
    .populate("users")
    .then(customer => res.status(201).json(customer))
    .catch(error => res.send(error));
};

exports.deleteCompany = (req, res, next) => {
  database.Companies.findByIdAndRemove(req.params.customerId)
    .then(customer => res.json(customer))
    .catch(error => res.send(error));
};

module.exports = exports;
