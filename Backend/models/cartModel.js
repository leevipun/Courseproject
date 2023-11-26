const mongoose = require("mongoose");

const cartItemSchema = mongoose.Schema({
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "List",
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const cartSchema = mongoose.Schema({
  items: [cartItemSchema],
});

cartSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
