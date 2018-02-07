const mongoose = require("mongoose");

const invoicesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Companies",
      required: true
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Locations",
      required: true
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tickets",
      required: true
    },
    number: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      default: Date.now(),
      required: true
    },
    due: {
      type: Date
    },
    line: [
      {
        type: String,
        default: ""
      }
    ],
    memo: {
      type: String,
      default: ""
    },
    notes: {
      type: String,
      default: ""
    },
    subtotal: {
      type: Number,
      default: 0
    },
    tax: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    },
    paid: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const Invoices = mongoose.model("Invoices", invoicesSchema);

module.exports = Invoices;
