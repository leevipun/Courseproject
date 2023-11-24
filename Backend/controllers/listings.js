const listingRouter = require("express").Router();
import { response } from "express";
import UserType from "../types";
import Pic from "../models/picModel";
const jwt = require("jsonwebtoken");
const List = require("../models/listModel");
require("express-async-errors");
const User = require("../models/userModel");
const blog = require("../models/blog");

listingRouter.get("/:id", async (req, res, next) => {
  const listings = await List.findById(req.params.id);
  if (listings) {
    res.json(listings);
  } else {
    response.status(404).end();
  }
});

listingRouter.post("/", async (req, res, next) => {
  const body = req.body;

  const deCodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!deCodedToken.id) {
    return res.status(401).json({ error: "Invalid token" });
  }
  const user = req.user;

  if (user.type !== "Seller") {
    return res.status(401).json({
      error: "You are not a seller. Switch role if you want to sell items.",
    });
  }

  const listing = new List({
    itemname: body.itemname,
    category: body.category,
    price: body.price,
    seller: user._id,
  });
  if (body.itemname && body.category && body.price && body.seller) {
    const savedListing = await listing.save();
    console.log(user._id);
    console.log(savedListing);
    user.listings = user.listings.contcat(savedListing._id);
    await user.save();
    res.json(savedListing);
  } else {
    res.sendStatus(400).send("Add missing information to continue");
  }
});
