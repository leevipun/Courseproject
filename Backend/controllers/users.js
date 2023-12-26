const bcrypt = require("bcrypt");
const User = require("../models/user");
const usersRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const middleware = require("../utils/middleware");
const List = require("../models/list");
const API_KEY = process.env.SECRET_STRIPE;
const stripe = require("stripe")(API_KEY);
require("express-async-errors");
const nodemailer = require("nodemailer");
const { transporter } = require("./email");
const pass = process.env.EMAILPASS;

const extractToken = middleware.extractToken;

usersRouter.post("/", async (req, res) => {
  const { newObject } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(newObject.password, saltRounds);

  console.log(req.ip);

  console.log("new object", newObject);

  const user = new User({
    email: newObject.email,
    firstname: newObject.firstName,
    lastname: newObject.lastName,
    passwordHash: passwordHash,
    country: newObject.country,
    style: newObject.style,
    id: newObject.id,
    city: newObject.city,
    address: newObject.address,
    postalCode: newObject.postalCode,
    phone: newObject.phone,
    iban: newObject.iban,
    Dob: newObject.Dob,
  });
  console.log(user);

  const savedUser = await user.save();

  res.status(201).json(savedUser);

  const options = {
    from: "nordicexchange@outlook.com",
    to: newObject.email,
    subject: "Welcome to Nordic Exchange!",
    text: "Thank you for registering to Nordic Exchange!\nAnd becoming a member of our community!\nWe hope you enjoy your stay!\nBest regards,\nNordic Exchange team",
  };

  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Sent: " + info.response, "to: " + info.accepted);
  });
});

usersRouter.patch("/stripe", extractToken, async (req, res) => {
  try {
    const iban = req.body.iban;
    const email = req.body.email;

    console.log(req.body);

    const user = await User.findOne({ email: email });
    console.log(user);
    console.log(user.email);
    console.log(user.country);
    console.log(user.Dob);
    console.log(user.phone);

    const splitBirthDate = user.Dob.split("/");
    console.log(splitBirthDate);
    const day = splitBirthDate[1];
    const month = splitBirthDate[0];
    const year = splitBirthDate[2];

    const stripeAccount = await stripe.accounts.create({
      type: "custom",
      email: user.email,
      country: user.country,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      tos_acceptance: {
        date: Math.floor(Date.now() / 1000),
        ip: "82.181.90.127",
      },
      business_type: "individual",
      business_profile: {
        mcc: "5734",
        product_description: "Test",
      },
      external_account: {
        object: "bank_account",
        country: user.country,
        currency: "eur",
        account_holder_name: user.name && user.lastName,
        account_holder_type: "individual",
        account_number: iban,
      },
      individual: {
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        phone: user.phone,
        address: {
          city: req.body.city,
          country: req.body.country,
          line1: req.body.address,
          postal_code: req.body.postalCode,
        },
        dob: {
          day: day,
          month: month,
          year: year,
        },
      },
    });

    // Update the user with the stripeId
    await User.updateOne(
      { email: user.email },
      { $set: { stripeId: stripeAccount.id } }
    );

    return res
      .status(200)
      .json({ message: "Stripe account created successfully" });
  } catch (error) {
    console.error(error);
    await User.findOneAndDelete({ email: req.body.email });
    return res.status(500).json({ error: "Internal server error" });
  }
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

usersRouter.get("/info", extractToken, async (req, res) => {
  const deCodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!deCodedToken.id) {
    return res.status(401).json({ error: "Invalid token" });
  }
  const user = await User.findOne({ email: deCodedToken.email });
  res.json(user);
});

usersRouter.put("/", async (req, res) => {
  const body = req.body;
  try {
    const deCodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!deCodedToken) {
      return res.status(401).json({ error: "Invalid token" });
    }
    const user = await User.findOne({ email: deCodedToken.email });
    console.log(user);
    const item = {
      email: body.email,
      name: body.name,
      address: body.address,
      phone: body.phone,
    };
    console.log(item);
    const updatedUser = await User.findByIdAndUpdate(user._id, item, {
      new: true,
    });
    console.log(updatedUser);
    await user.save();
    res.json(updatedUser);
  } catch (error) {
    console.log("Tänne :(");
    console.error(error);
    return res
      .status(400)
      .send({ error: "Error occurred while updating user" });
  }
});

usersRouter.put("/password", async (req, res) => {
  const body = req.body;
  try {
    const deCodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!deCodedToken) {
      return res.status(401).json({ error: "Invalid token" });
    }
    const user = await User.findOne({ email: deCodedToken.email });
    console.log(user);
    const passwordCorrect = await bcrypt.compare(
      body.password,
      user.passwordHash
    );
    if (passwordCorrect) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const passwordHash = await bcrypt.hash(body.password, 10);
    const item = {
      passwordHash: passwordHash,
    };
    console.log(item);
    const updatedUser = await User.findByIdAndUpdate(user._id, item, {
      new: true,
    });
    console.log(updatedUser);
    await user.save();
    res.json(updatedUser);
  } catch (error) {
    console.log("Tänne :(");
    console.error(error);
    return res.status(400).send("Error occurred while updating user");
  }
});

usersRouter.delete("/", async (req, res) => {
  try {
    const deCodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!deCodedToken) {
      return res.status(401).json({ error: "Invalid token" });
    }
    const user = await User.findOne({ email: deCodedToken.email });
    const userListings = user.listings;
    const userCart = user.cart;
    const userStripeId = user.stripeId;
    console.log(userStripeId);
    console.log(userCart);
    console.log(user);
    console.log(userListings);
    for (const id of userListings) {
      console.log(id);
      await List.findByIdAndRemove(id);
    }

    const item = {
      status: "Avialable",
    };
    if (userCart) {
      for (const id of userCart) {
        await List.findByIdAndUpdate(id, item, { new: true });
      }
    }
    const deletedStripeAccount = await stripe.accounts.del(userStripeId);
    if (!deletedStripeAccount || deletedStripeAccount.deleted !== true) {
      return res.status(400).send("Error occurred while deleting account");
    } else {
      await User.findByIdAndRemove(user._id);
      const options = {
        from: "nordicexchange@outlook.com",
        to: user.email,
        subject: "Account deleted",
        html: "<h1>We are sorry to see you go!</h1><p>We hope you enjoyed your stay!</p><p>Hopefully we'll see in the future agen</p><p>Best regards,</p><p>Nordic Exchange team</p>",
      };
      transporter.sendMail(options, function (err, info) {
        if (err) {
          console.log(err);
          return;
        }
        console.log("Sent: " + info.response, "to: " + info.accepted);
      });
      res.status(204).send("User deleted Successfully");
    }
  } catch (error) {
    console.error(error);
    return res.status(400).send("Error occurred while deleting user");
  }
});

usersRouter.get("/listings", extractToken, async (req, res) => {
  const deCodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!deCodedToken) {
    return res.status(401).send({ error: "Invalid Token" });
  }
  const userData = await User.findOne({ email: deCodedToken.email })
    .select("listings")
    .exec();
  if (userData) {
    const listings = await Promise.all(
      userData.listings.map(async (id) => {
        return await List.findById(id);
      })
    );
    res.json(listings);
  } else {
    res.status(404).send({ error: "User not found" });
  }
});

usersRouter.delete("/stripe", (req, res) => {
  req.body.stripeId;
  console.log(req.body.stripeId);
  stripe.accounts.del(req.body.stripeId);
  return res.status(200).json({ message: "Stripe account deleted" });
});

module.exports = usersRouter;
