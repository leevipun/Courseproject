const favoriteRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const List = require("../models/list");
const User = require("../models/user");
require("express-async-errors");
const middleware = require("../utils/middleware");
const { models } = require("mongoose");

const extractUser = middleware.extractUser;
const extractToken = middleware.extractToken;

favoriteRouter.get("/", extractUser, extractToken, async (req, res, next) => {
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

favoriteRouter.post("/", extractToken, extractUser, async (req, res, next) => {
  try {
    const body = req.body;

    const deCodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!deCodedToken.id) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const user = req.user;
    if (body.id) {
      const listing = await List.findById(body.id);
      if (listing) {
        user.favorite.push(listing._id);
        await user.save();
        res.json(listing);
      } else {
        res.status(404).send("Item not found");
      }
    } else {
      res.status(400).send("Invalid request");
    }
  } catch (error) {
    next(error);
  }
});

favoriteRouter.delete("/:id", extractUser, async (req, res) => {
  try {
    const itemId = req.params.id;
    const user = req.user;
    const userId = user._id;

    const userFavorites = await User.findById(userId).select("favorite").exec();

    if (userFavorites) {
      const remainingItems = userFavorites.favorite.filter(
        (id) => id.toString() !== itemId
      );
      await User.findByIdAndUpdate(userId, { favorite: remainingItems });
      res.json(remainingItems);
    } else {
      res.status(400).send("Invalid ID");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = favoriteRouter;
