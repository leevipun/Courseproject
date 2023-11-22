const mongoose = require("mongoose");

const listSchema = mongoose.Schema({
  itemname: {
    type: String,
    required: true,
    minlength: 3,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

listSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const List = mongoose.model("List", listSchema);

module.exports = List;
