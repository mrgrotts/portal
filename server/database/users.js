const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Companies"
    },
    firstName: {
      type: String,
      default: ""
    },
    lastName: {
      type: String,
      default: ""
    },
    countryCode: {
      type: Number,
      trim: true,
      default: "",
      match: [/^\+?\d+[\d\s]+$/, "Please use a valid country code"]
    },
    phone: {
      type: Number,
      trim: true,
      default: "",
      match: [/^\+?\d+[\d\s]+$/, "Please use a valid phone number"]
    },
    profilePicture: {
      type: String,
      default: ""
    },
    role: {
      type: String,
      enum: [
        "New Account",
        "Customer User",
        "Customer Manager",
        "Admin User",
        "Admin Manager",
        "Admin Owner",
        "Super Admin"
      ],
      default: "New Account"
    },
    tickets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tickets"
      }
    ],
    locations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Locations"
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

usersSchema.pre("save", function(next) {
  if (!this.isModified("password")) {
    return next();
  }

  bcrypt.hash(this.password, 10).then(
    hashedPassword => {
      this.password = hashedPassword;
      next();
    },
    error => next(error)
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

usersSchema.methods.isVerified = function(next) {
  if (this.verified) {
    next(null);
  } else {
    next(`User not verified: ${this.email}`);
  }
};

const Users = mongoose.model("Users", usersSchema);
module.exports = Users;
