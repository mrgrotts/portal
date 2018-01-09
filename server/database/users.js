const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String
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
  ]
});

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
