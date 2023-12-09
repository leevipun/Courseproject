import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { addNotification } from "../../reducer/notificationReducer";
import { useDispatch, useSelector } from "react-redux";
import "../styles/stripe.css";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector((state) => state.user);

  const userCart = user[0].cart;

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          dispatch(addNotification("Payment succeeded!"));
          console.log(paymentIntent);
          break;
        case "processing":
          dispatch(addNotification("Your payment is processing."));
          console.log(paymentIntent);
          break;
        case "requires_payment_method":
          dispatch(
            addNotification(
              "Your payment was not successful, please try again."
            )
          );
          console.log(paymentIntent);
          break;
        default:
          dispatch(addNotification("Something went wrong."));
          console.log(paymentIntent);
          break;
      }
    });
  }, [stripe]);

  console.log("User", user);
  console.log("Kärry", userCart);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:5173/success",
        receipt_email: email,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      dispatch(addNotification(error.message));
    } else {
      dispatch(addNotification("An unexpected error occurred."));
    }

    setIsLoading(false);
  };

  const options = {
    layout: {
      type: "accordion",
      defaultCollapsed: false,
      radios: false,
      spacedAccordionItems: true,
    },
  };

  return (
    <body id="body">
      <form id="payment-form" onSubmit={handleSubmit}>
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email address"
        />

        <PaymentElement id="payment-element" options={options} />
        <button disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>
      </form>
    </body>
  );
}