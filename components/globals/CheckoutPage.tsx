"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Button } from "@/components/ui/button";
// import { send } from "@/actions/sendEmail";
import { EmailTemplate } from "./email-template";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({ amount, onSuccess, firstName, lastName, email, phone, address, service, date, notes }: { amount: number, onSuccess: () => void, firstName: string, lastName: string, email: string, phone: string, address: string, service: string, date: Date, notes?: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    // Build return URL with all booking data
    const returnUrl = new URL(`${process.env.NEXT_PUBLIC_SITE_URL}/book/payment-success`);
    returnUrl.searchParams.set('amount', amount.toString());
    returnUrl.searchParams.set('firstName', firstName);
    returnUrl.searchParams.set('lastName', lastName);
    returnUrl.searchParams.set('email', email);
    returnUrl.searchParams.set('phone', phone);
    returnUrl.searchParams.set('address', address);
    returnUrl.searchParams.set('service', service);
    returnUrl.searchParams.set('date', date.toISOString());
    if (notes) {
      returnUrl.searchParams.set('notes', notes);
    }

    const {error} = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: returnUrl.toString(),
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
    // Note: If successful, Stripe will redirect to return_url
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
      <PaymentElement />

      {errorMessage && <div className="text-red-500 text-center">{errorMessage}</div>}

      <Button
        variant="snow"    
        size="default"
        disabled={!stripe || loading}
        className="w-full mt-2"
      >
        {!loading ? `Pay $${amount}` : "Processing..."}
      </Button>
    </form>
  );
};

const CheckoutPage = ({ amount, onSuccess, firstName, lastName, email, phone, address, service, date, notes }: { amount: number, onSuccess: () => void, firstName: string, lastName: string, email: string, phone: string, address: string, service: string, date: Date, notes?: string }) => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const hasCreatedIntent = useRef(false);

  useEffect(() => {
    // Prevent duplicate API calls (especially important in React StrictMode)
    if (hasCreatedIntent.current || clientSecret) {
      return;
    }

    hasCreatedIntent.current = true;
    console.log('Creating payment intent for amount:', amount);
    
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.error('Payment intent creation error:', data.error);
          setErrorMessage(data.error);
          hasCreatedIntent.current = false; // Allow retry on error
        } else {
          console.log('Payment intent created successfully');
          setClientSecret(data.clientSecret);
        }
      })
      .catch((error) => {
        console.error('Payment intent fetch error:', error);
        setErrorMessage("Failed to initialize payment. Please try again.");
        hasCreatedIntent.current = false; // Allow retry on error
      });
  }, [amount, clientSecret]);

  if (!clientSecret) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="absolute! -m-px! h-px! w-px! overflow-hidden! whitespace-nowrap! border-0! p-0! [clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="text-red-500 text-center p-4">
        {errorMessage}
      </div>
    );
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
      }}
    >
      <CheckoutForm 
        amount={amount} 
        onSuccess={onSuccess} 
        firstName={firstName} 
        lastName={lastName} 
        email={email} 
        phone={phone} 
        address={address} 
        service={service} 
        date={date} 
        notes={notes} 
      />
    </Elements>
  );
};

export default CheckoutPage;
