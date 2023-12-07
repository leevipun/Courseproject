const express = require("express");
const checkOutRouter = express.Router();
const stripe = require("stripe")(
  "sk_test_51OKnCVIH6vH73ShNPtzwZJKzDbG3eSOiDeQ4tTF6t5lOZk3me8QAdJVtrK3tuprepwq5Oi0ztCXezj1dCXQQiOIe008rynSjzD"
);

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
