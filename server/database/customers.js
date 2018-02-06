const mongoose = require('mongoose');

const customersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: 'Please enter a company name'
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true
    },
    headquarters: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Locations',
      required: true,
      min: 1,
      max: 1
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
    tickets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tickets'
      }
    ]
  },
  {
    timestamps: true
  }
);

const Customers = mongoose.model('Customers', customersSchema);

module.exports = Customers;
