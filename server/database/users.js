const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usersSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      default: ''
    },
    lastName: {
      type: String,
      default: ''
    },
    countryCode: {
      type: String,
      trim: true,
      default: '',
      match: [/^\+?\d+[\d\s]+$/, 'Please use a valid phone number']
    },
    phone: {
      type: String,
      trim: true,
      default: '',
      match: [/^\+?\d+[\d\s]+$/, 'Please use a valid phone number']
    },
    profilePicture: {
      type: String
    },
    admin: {
      type: Boolean,
      default: false
    },
    tickets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tickets'
      }
    ],
    locations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Locations'
      }
    ],
    verified: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

usersSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.hash(user.password, 10).then(
    hashedPassword => {
      user.password = hashedPassword;
      next();
    },
    error => {
      return next(error);
    }
  );
});

usersSchema.methods.comparePassword = function(candidatePassword, next) {
  bcrypt.compare(candidatePassword, this.password, (error, isMatch) => {
    if (error) {
      return next(error);
    }

    next(null, isMatch);
  });
};

const Users = mongoose.model('Users', usersSchema);
module.exports = Users;
