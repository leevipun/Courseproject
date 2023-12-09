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
    console.log("body", body);
    console.log("Request user", req.user);
    const deCodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!deCodedToken.id) {
      return res.status(401).json({ error: "Invalid token" });
    }
    const user = req.user;
    if (body.id) {
      const cartlistings = await user.cart;
      const listing = await List.findById(body.id);
      if (!listing) {
        console.log("Ei löytynyt listaus");
        return res.status(400).json({ error: "Item not found" });
      }
      if (listing.author === user._id.toString()) {
        console.log("Oma listaus");
        return res.status(400).json({ error: "You can't buy your own item" });
      }
      if (cartlistings.includes(body.id)) {
        console.log("Löytyi jo listauksesta");
        return res.status(400).json({ error: "Item already in cart" });
      }
      if (listing.status === "In cart") {
        return res
          .status(400)
          .json({ error: "Item already in someone's cart" });
      } else {
        console.log("Läytyi listaus");
        // Check if the author of the new listing is different from the author of items already in the cart
        if (cartlistings.length > 0) {
          const authorsInCart = await List.find({ _id: { $in: cartlistings } })
            .distinct("author")
            .exec();
          if (
            authorsInCart.length > 0 &&
            !authorsInCart.includes(listing.author.toString())
          ) {
            console.log("Items from different authors in cart");
            return res
              .status(400)
              .json({ error: "Can only have items from one author" });
          }
        }
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
    }
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

module.exports = cartRouter;
