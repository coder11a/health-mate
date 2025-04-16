import { loadStripe } from "@stripe/stripe-js";
import React from 'react';

export async function checkout({ lineItems, customerDetails }) {
    // Validate that required customer details are provided for Indian exports
 

    let stripePromise = null;
    const getStripe = () => {
        if (!stripePromise) {
            stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
        }
        return stripePromise;
    };

    const stripe = await getStripe();
    
    // Create the checkout session with customer details
    const { error } = await stripe.redirectToCheckout({
        mode: "payment",
        lineItems,
        successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/dashboard`,
        customerEmail: 'testmail@gmail.com', // Optional but recommended
        billingAddressCollection: 'auto', // Required for Indian exports
     
    });

    if (error) {
        console.error('Stripe checkout error:', error);
        throw error;
    }
}