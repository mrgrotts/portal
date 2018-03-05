const { API_WELCOME_MESSAGE } = require('../constants');

exports.restAPI = (req, res, next) => {
  res.json({
    message: API_WELCOME_MESSAGE,
    companiesSchema: '/companies',
    usersSchema: '/users',
    locationsSchema: '/locations',
    workSchema: '/work'
  });
};

exports.companiesAPI = (req, res, next) => {
  res.json({
    _id: 'Unique Identifier',
    owner: 'Mongo Document ID',
    name: 'String',
    domain: 'String',
    phone: 'String',
    users: ['Mongo Document Collection'],
    locations: ['Mongo Document Collection'],
    work: ['Mongo Document Collection']
  });
};

exports.usersAPI = (req, res, next) => {
  res.json({
    _id: 'Unique Identifier',
    email: 'Unique String',
    password: 'Encrypted String (JWT)',
    profilePicture: 'Google Cloud Storage URL'
  });
};

exports.locationsAPI = (req, res, next) => {
  res.json([
    {
      _id: 'Unique Identifier',
      userId: 'Mongo Document ID',
      company: 'Mongo Document ID',
      name: 'String',
      addressOne: 'String',
      addressTwo: 'String',
      city: 'String',
      state: 'String',
      zipcode: 'Number',
      latitude: 'Number',
      longitude: 'Number',
      work: ['Mongo Document Collection']
    }
  ]);
};

exports.workAPI = (req, res, next) => {
  res.json([
    {
      _id: 'Unique Identifier',
      userId: 'Mongo Document ID',
      company: 'Mongo Document ID',
      team: ['Mongo Document Collection'],
      status: 'Enum',
      category: 'Enum',
      location: 'Mongo Document ID',
      description: 'String',
      media: ['Array of Google Cloud Storage URLs'],
      messages: ['Mongo Document Collection'],
      assignedTo: 'Enum',
      requestedDate: 'Date',
      scheduledFor: 'Date',
      partPurchasedDate: 'Date',
      partArrivedDate: 'Date',
      workCompleted: 'String',
      hoursSpent: 'Number',
      hourlyRate: 'Number',
      completedDate: 'Date',
      requestedDeletion: 'Boolean',
      createdAt: 'Date',
      updatedAt: 'Date'
    }
  ]);
};

module.exports = exports;
