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
  name: String,
  passwordHash: {
    type: String,
    minlength: 3,
    required: true,
  },
  style: {
    type: String,
    enum: ["buyer", "seller", "both"],
  },
  listings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
    },
  ],
  id: {
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
