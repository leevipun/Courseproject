const cartItemSchema = mongoose.Schema({
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
    }
  });