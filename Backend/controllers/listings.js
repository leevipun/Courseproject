const listingRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const List = require("../models/list");
require("express-async-errors");
const User = require("../models/user");
const middleware = require("../utils/middleware");

const extractUser = middleware.extractUser;
const extractToken = middleware.extractToken;

listingRouter.get("/:id", async (req, res, next) => {
  const listings = await List.findById(req.params.id);
  if (listings) {
    res.json(listings);
  } else {
    response.status(404).end();
  }
});

listingRouter.get("/", async (req, res, next) => {
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

listingRouter.post("/", extractUser, extractToken, async (req, res, next) => {
  const body = req.body;

  console.log(req.token);
  console.log("body", body);
  console.log("Request user", req.user);
  console.log("Authorization Header:", req.headers.authorization);

  const deCodedToken = jwt.verify(req.token, process.env.SECRET);
  console.log(deCodedToken.id);
  if (!deCodedToken.id) {
    return res.status(401).json({ error: "Invalid token" });
  }

  const user = req.user;

  const listing = new List({
    name: body.name,
    country: body.country,
    description: body.description,
    price: body.price,
    currency: body.currency,
    category: body.category,
    pics: body.pics,
    author: user.email,
    lastPrice: body.price,
    pics: body.pics,
    status: "Aviable",
  });

  console.log(listing);

  if (body) {
    console.log("Täällä");
    const savedListing = await listing.save();
    console.log(user._id);
    console.log(savedListing);
    user.listings = user.listings.concat(savedListing._id);
    await user.save();
    res.json(savedListing);
    console.log("onnistui!");
  } else {
    console.log("Täällä päin");
    res.status(400).send("Add missing information to continue");
  }
});

listingRouter.put("/", extractToken, async (req, res) => {
  try {
    const body = req.body;
    const listing = await List.findById(body.id);
    console.log(listing);
    const deCodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!deCodedToken) {
      return res.status(401).send({ error: "Invalid token" });
    }
    const item = {
      name: body.name,
      country: body.country,
      description: body.description,
      price: body.price,
      lastPrice: listing.price,
    };
    const updatedListing = await List.findByIdAndUpdate(body.id, item, {
      new: true,
    });
    res.json(updatedListing);
  } catch (error) {
    res.status(500).send({ error: "An error occurred" });
  }
});

listingRouter.delete("/:id", async (req, res) => {
  try {
    const deCodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!deCodedToken) {
      return res.status(401).send({ error: "Invalid token" });
    }
    const user = await User.findById(deCodedToken.id);
    console.log("Täällä");
    const listing = await List.findById(req.params.id);
    const buyer = User.findById(listing.buyer);
    console.log("Täällä myös");
    const userlistings = (user.listings = user.listings.filter(
      (item) => item.toString() !== listing.id.toString()
    ));
    const item = {
      listings: userlistings,
    };
    console.log(item);
    await User.findByIdAndUpdate(deCodedToken.id, item, {
      new: true,
    });
    console.log("Päivitys onnistui");
    console.log(listing.buyer);
    await User.findOneAndUpdate(
      { email: listing.buyer },
      {
        $pull: { cart: listing._id },
      }
    );
    await User.findOneAndUpdate(
      { email: listing.author },
      {
        $pull: { listings: listing.id },
      }
    );
    console.log("Poisto onnistui");
    await List.findByIdAndDelete(req.params.id);
    console.log("Kaikki onnistui");
    res.status(200).send(userlistings);
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

module.exports = listingRouter;
