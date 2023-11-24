const getRouter = require("express").Router();
const List = require("../models/listModel");
require("express-async-errors");

getRouter.get("/", async (req, res, next) => {
  try {
    const listings = await List.find({});
    console.log(listings);
    if (listings) {
      res.json(listings);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
});

module.exports = getRouter;
