const mongoose = require("mongoose");

const companiesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true
    },
    name: {
      type: String,
      required: "Please enter a company name"
    },
    headquarters: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Locations",
      required: true,
      min: 1,
      max: 1
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
      }
    ],
    locations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Locations"
      }
    ],
    tickets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tickets"
      }
    ]
  },
  {
    timestamps: true
  }
);

const Companies = mongoose.model("Companies", companiesSchema);

module.exports = Companies;
