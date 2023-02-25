import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import styles from "./CheckoutForm.css";

import Checkout from "./Checkout";
import { BACKEND_DOMAIN } from "../util/api";

const stripePromise = loadStripe(
    "pk_test_51Mf6SqEz35CHYtWa25NhQDGuNL2frlr5XQa5428WXhNgTRIMEyjtxVWnhaz0yrFjrOJbQk2BCOiVTK75NRmLlYe700OYuruv0R"
);

export default function CheckoutForm() {
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch(BACKEND_DOMAIN + "create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
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
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <Checkout />
                </Elements>
            )}
        </div>
    );
}
