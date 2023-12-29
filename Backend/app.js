const config = require("./utils/config.js");
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login.js");
const listingRouter = require("./controllers/listings.js");
const cartRouter = require("./controllers/cart.js");
const favoriteRouter = require("./controllers/favorite.js");
const checkoutRouter = require("./controllers/checkout.js");
const { emailRouter } = require("./controllers/email.js");
var bodyParser = require("body-parser");
const friendsRouter = require("./controllers/friends.js");

mongoose.set("strictQuery", false);

logger.info("connecting to", config.MONGODB_URI);

app.set("trust proxy", true);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connection to MongoDB:", error.message);
  });

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.extractToken);

app.use(express.static(path.join(__dirname, "dist")));
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/listings", listingRouter);
app.use("/api/email", emailRouter);
app.use("/api/friends", friendsRouter);

app.use("/api/cart", cartRouter);
app.use("/api/favorite", favoriteRouter);

app.use("/api/checkout", checkoutRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
