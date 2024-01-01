const cartRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const List = require("../models/list");
require("express-async-errors");
const User = require("../models/user");
const middleware = require("../utils/middleware");
const Cart = require("../models/cart");
const extractUser = middleware.extractUser;
const extractToken = middleware.extractToken;

cartRouter.post("/", extractUser, extractToken, async (req, res, next) => {
  try {
    const body = req.body;
    const deCodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!deCodedToken.id) {
      return res.status(401).json({ error: "Invalid token" });
    }
    const user = req.user;
    const listing = await List.findById(body.id);
    if (!listing) {
      return res.status(400).json({ error: "Item not found" });
    }
    if (listing.author === user.email) {
      return res.status(400).json({ error: "You can't buy your own item" });
    }
    if (user.cart.includes(body.email)) {
      return res.status(400).json({ error: "Item already in cart" });
    }
    if (listing.status === "In cart") {
      return res.status(400).json({ error: "Item already in someone's cart" });
    }
    if (user.cart.length > 0) {
      const authorsInCart = await List.find({ _id: { $in: user.cart } })
        .distinct("author")
        .exec();
      if (authorsInCart.length > 0 && !authorsInCart.includes(listing.author)) {
        return res
          .status(400)
          .json({ error: "Can only have items from one author" });
      }
    }
    const item = {
      status: "In cart",
      buyer: user.email,
    };
    const updatedList = await List.findByIdAndUpdate(body.id, item, {
      new: true,
    });
    user.cart.push(listing._id);
    await user.save();
    const listings = await List.find({});
    const remainingListings = listings.filter(
      (listing) => listing.id !== body.id
    );
    res.json(remainingListings);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

cartRouter.get("/", extractUser, extractToken, async (req, res, next) => {
  try {
    const user = req.user;
    const id = user._id;

    const userDocument = await User.findById(id).select("cart").exec();

    if (userDocument) {
      const listings = await Promise.all(
        userDocument.cart.map(async (id) => {
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

cartRouter.delete("/:id", extractUser, async (req, res, next) => {
  try {
    const user = req.user;
    const userid = user._id;
    const itemid = req.params.id;

    const userCart = await User.findById(userid).select("cart").exec();

    if (userCart) {
      const remainingItems = userCart.cart.filter(
        (id) => id.toString() !== itemid
      );
      await User.findByIdAndUpdate(userid, { cart: remainingItems });
      const item = {
        status: "Aviable",
      };
      const updatedList = await List.findByIdAndUpdate(req.params.id, item, {
        new: true,
      });
      res.json(remainingItems);
    } else {
      res.status(400).send("Invalid ID");
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

cartRouter.get("/admin/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const userCart = await User.findById(id).select("cart").exec();
    if (userCart) {
      const listings = await Promise.all(
        userCart.cart.map(async (id) => {
          return await List.findById(id);
        })
      );
      console.log(listings);
      res.json(listings);
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

cartRouter.delete("/admin/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ cart: id }).exec();
    await User.findByIdAndUpdate(user._id, {
      $pull: { cart: id },
    });
    const item = {
      status: "Aviable",
    };
    await List.findByIdAndUpdate(id, item, {
      new: true,
    });
    res.status(204).json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = cartRouter;
