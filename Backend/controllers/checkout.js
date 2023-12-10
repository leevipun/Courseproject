const express = require("express");
const checkOutRouter = express.Router();
const API_KEY = process.env.SECRET_STRIPE;
const stripe = require("stripe")(API_KEY);
const User = require("../models/user");

const calculateOrderAmount = (items) => {
  const total = items.reduce((acc, item) => {
    return acc + item.price;
  }, 0);

  console.log(items);

  const minimumAmount = 0.5;
  if (total < minimumAmount) {
    throw new Error(`Amount must be at least €${minimumAmount.toFixed(2)} eur`);
  }

  const formattedTotal = `${total * 100}`;
  console.log(formattedTotal);
  return formattedTotal;
};

checkOutRouter.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  console.log("Item", items);

  console.log("Author", items[0].author);

  const user = await User.findById(items[0].author);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
    application_fee_amount: 123,
    transfer_data: {
      destination: `${user.stripeId}`,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

module.exports = checkOutRouter;
