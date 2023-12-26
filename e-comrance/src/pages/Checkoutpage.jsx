import { useEffect, useState } from "@react";
import { loadStripe } from "@stripe/stripe-js";
import Services, { createPaymentIntent } from "../services/Services";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51OKnCVIH6vH73ShNYWADAfCZDWGrshfLbylxZJNzr3qJcuGHKavRE0JITdLoMRL3VnEsuD8CG7TlFbqLRNROLKrh000HpEysVB"
);

const CheckoutPage = () => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const items = await Services.getAllCartItems();
      const response = await createPaymentIntent(items);
      setClientSecret(response.clientSecret);
      console.log(response);
    };
    fetchData();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      <h1>Checkout Page</h1>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default CheckoutPage;
