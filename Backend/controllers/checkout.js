const express = require("express");
const checkOutRouter = express.Router();
const API_KEY = process.env.SECRET_STRIPE;
const stripe = require("stripe")(API_KEY);

const calculateOrderAmount = (items) => {
  return 1400;
};

checkOutRouter.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

module.exports = checkOutRouter;
