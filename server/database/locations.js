const mongoose = require('mongoose');

const locationsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true
    },
    name: {
      type: String,
      required: 'Please enter a location name'
    },
    addressOne: {
      type: String,
      required: 'Please enter an address'
    },
    addressTwo: {
      type: String
    },
    city: {
      type: String,
      required: 'Please enter a city'
    },
    state: {
      type: String,
      required: 'Please enter a state',
      max: 2,
      min: 2
    },
    zipcode: {
      type: String,
      required: 'Please enter a zipcode',
      max: 5,
      min: 5
    },
    latitude: {
      type: Number,
      default: 41.88
    },
    longitude: {
      type: Number,
      default: -87.65
    },
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

// class LocationClass {
//   // methods for schema go here
//   // http://mongoosejs.com/docs/advanced_schemas.html
// }

// locationSchema.loadClass(LocationClass);
const Locations = mongoose.model('Locations', locationsSchema);

module.exports = Locations;
