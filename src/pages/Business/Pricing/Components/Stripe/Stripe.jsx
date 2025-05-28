import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { REACT_APP_API_URL, stripeKey } from "../../../../../constants/constants";
import { apiPost } from "../../../../../services/userAuth";
import { getStorage } from "../../../../../services/storage";
import Spinner from "../../../../../Shared/Loader/Spinner";
import { useNavigate } from "react-router-dom";
// PaymentForm.js
const stripePromise = loadStripe(stripeKey);

function PaymentForm({ id, setOpen }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const token = getStorage("token");
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // payment create intent =================
    const params = { package_id: id };
    const res = await fetch(`${REACT_APP_API_URL}payment/create-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });
    const data = await res.json();
    // End payment create intent =================

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error("[Error]", error);
      setLoading(false);
      alert("Payment failed!");
    } else {
      const { error: confirmError } = await stripe.confirmCardPayment(data.payload.paymentIntent, {
        payment_method: paymentMethod.id,
      });

      if (confirmError) {
        console.error("[Error]", confirmError);
        alert("Payment failed!");
      } else {
        // Confirm payment ======================
        const urlConfirm = `${REACT_APP_API_URL}payment/confirm`;
        const paramsConfirm = { paymentIntentId: data.payload.paymentIntentId };
        const responseConfirm = await apiPost(urlConfirm, paramsConfirm, token);
        if (responseConfirm.success === true) {
          setTimeout(() => {
            setOpen(false);
            navigate("/dashboard/billing-info");
          }, 1000);
        }
      }

      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-3">
        <label>Card Details :</label>
        <div className="border rounded-pill p-3">
          <CardElement />
        </div>
      </div>
      <button className="default__btn text-white w-100 mt-4" type="submit" disabled={!stripe || loading}>
        <span> {loading ? "Processing..." : "Pay Now"}</span>
      </button>
    </form>
  );
}

const StripePay = ({ setOpen, package_id }) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm setOpen={setOpen} id={package_id} />
    </Elements>
  );
};

export default StripePay;
