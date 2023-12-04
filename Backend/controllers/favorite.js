const favoritesRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const List = require("../models/list");
require("express-async-errors");
const middleware = require("../utils/middleware");

const extractUser = middleware.extractUser;
const extractToken = middleware.extractToken;

favoritesRouter.get("/", extractUser, extractToken, async (req, res, next) => {
    try {
      const user = req.user;
      const id = user._id;
  
      const userDocument = await User.findById(id).select("favorite").exec();
  
      if (userDocument) {
        const listings = await Promise.all(
          userDocument.favorite.map(async (id) => {
            return await List.findById(id);
          })
        );
  
        res.json(listings);
      } else {
        res.status(404).send("User not found");
      }
    } catch (error) {
      next(error);
    }
  });