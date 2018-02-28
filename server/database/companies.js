const mongoose = require('mongoose');

const companiesSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true
    },
    name: {
      type: String,
      required: 'Please enter a company name'
    },
    domain: {
      type: String,
      required: 'Please enter a domain'
    },
    phone: {
      type: String
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
      }
    ],
    locations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Locations'
      }
    ],
    work: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Work'
      }
    ]
  },
  {
    timestamps: true
  }
);

const Companies = mongoose.model('Companies', companiesSchema);

module.exports = Companies;
