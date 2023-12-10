const { first } = require("lodash");
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    minlength: 3,
    required: true,
  },
  style: {
    type: String,
    enum: ["buyer", "seller", "both"],
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  listings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
    },
  ],
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
    },
  ],
  favorite: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
    },
  ],
  id: {
    type: String,
    required: true,
  },
  stripeId: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: true,
  },
});

userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
