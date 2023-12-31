import { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { addNotification } from "../../reducer/notificationReducer.js";
import { useDispatch, useSelector } from "react-redux";
import "../styles/stripe.css";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector((state) => state.user);

  const userCart = user.cart;

  console.log("UserCart", userCart);

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
        return_url: `${window.location.origin}/payment-successful`,
      },
      redirect: "if_required",
    });

    if (!error) {
      navigate("/payment-successful");
    }

    if (error) {
      console.error("Stripe Confirm Payment Error:", error);
      // Handle the error and display relevant information to the user
    }
    if (error.type === "card_error" || error.type === "validation_error") {
      dispatch(addNotification(error.message));
    } else {
      console.log(error);
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
      <form id="form" onSubmit={handleSubmit}>
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
