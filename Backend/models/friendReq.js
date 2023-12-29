const mongoose = require("mongoose");

const friendReqSchema = mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  senderName: {
    type: String,
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  receiverName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

friendReqSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
  },
});

const FriendReq = mongoose.model("FriendReq", friendReqSchema);

module.exports = FriendReq;
