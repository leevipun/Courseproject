import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { createPaymentIntent } from "../services/Services";
import { getAllCartItems } from "../services/Services";

const stripePromise = loadStripe(
  "pk_test_51OKnCVIH6vH73ShNYWADAfCZDWGrshfLbylxZJNzr3qJcuGHKavRE0JITdLoMRL3VnEsuD8CG7TlFbqLRNROLKrh000HpEysVB"
);

const CheckoutPage = () => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const items = await getAllCartItems();
      const response = await createPaymentIntent(items);
      console.log(response);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Checkout Page</h1>
    </div>
  );
};
