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
    enum: ["buyer", "seller", "both", "admin"],
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
  history: [
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
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: false,
  },
  postalCode: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  Dob: {
    type: String,
    required: false,
  },
  iban: {
    type: String,
    required: false,
  },
  friendReq: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FriendReq",
    },
  ],
  chats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
  ],
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

userSchema.pre("save", async function (next) {
  const user = this;

  // Check for unique email before saving
  const existingUser = await User.findOne({ email: user.email });
  if (existingUser) {
    const error = new Error("Email must be unique");
    return next(error);
  }

  next();
});

module.exports = User;
