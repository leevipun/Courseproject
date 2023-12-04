const config = require("./utils/config.js");
const express = require("express");
const app = express();
const cors = require("cors");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login.js");
const listingRouter = require("./controllers/listings.js");
const cartRouter = require("./controllers/cart.js");
const favoriteRouter = require("./controllers/favorite.js");

mongoose.set("strictQuery", false);

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connection to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(express.static("dist copy"));
app.use(middleware.requestLogger);
app.use(middleware.extractToken);

app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/listings", listingRouter);

app.use("/api/cart", cartRouter);
app.use("/api/favorite", favoriteRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
