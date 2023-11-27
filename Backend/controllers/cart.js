const cartRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const List = require("../models/list");
require("express-async-errors");
const User = require("../models/user");
const middleware = require("../utils/middleware");

const extractUser = middleware.extractUser;
const extractToken = middleware.extractToken;

cartRouter.post("/", extractUser, extractToken, async (req, res, next) => {
  const body = req.body;

  console.log("body", body);

  console.log("Request user", req.user);

  const deCodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!deCodedToken.id) {
    return res.status(401).json({ error: "Invalid token" });
  }
  const user = req.user;
  if (body.id) {
    const cartlistings = await user.cart;
    console.log("Cartlistings", cartlistings);
    const listing = await List.findById(body.id);
    if (cartlistings.includes(body.id)) {
      res.json("Already in cart");
    } else if (listing) {
      if (listing.status === "In cart") {
        res.json("Some one has already taken that");
      } else {
        console.log("Läytyi listaus");
        const item = {
          status: "In cart",
        };
        const updatedList = await List.findByIdAndUpdate(body.id, item, {
          new: true,
        });
        user.cart = user.cart.concat(listing._id);
        await user.save();
        res.json(listing);
      }
    } else {
      console.log("Ei löytyny");
      res.status(404).send("Item not found");
    }
  } else {
    console.log("Mentiin vaan tänne suoraan");
    return res.status(400).send("Error occurred while adding to cart");
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

module.exports = cartRouter;
