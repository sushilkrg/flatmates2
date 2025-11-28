import { Request, Response } from "express";
import Stripe from "stripe";
import Listing from "../models/Listing";
import Transaction from "../models/Transaction";
// import stripe from "stripe";
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
//   apiVersion: "2025-09-30.clover" // use your current Stripe API version
// });

console.log(
  "Stripe key:",
  process.env.STRIPE_SECRET_KEY ? process.env.STRIPE_SECRET_KEY : "Missing ❌"
);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-09-30.clover",
});
// POST /payments/create-checkout-session
export const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const { listingId, amount } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      // -------
      // India export compliance: force Stripe to collect name + full billing address
      billing_address_collection: "required", // collects name + full billing address[web:44][web:47]
      customer_creation: "always", // creates a Customer with those details[web:45][web:47]
      // -------
      success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      // success_url: `${process.env.FRONTEND_URL}/payment-success`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: { name: "Feature Listing" },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        listingId,
        userId: String(req.user._id),
        // userId: req.user._id.toString(),
      },
    });
    console.log("Stripe session created:", session.url);
    // return res.json({ sessionId: session.id });
    console.log("Session URL-", session.url);

    return res.status(200).json({
      success: true,
      url: session.url, // ⬅ MUST BE RETURNED
      id: session.id,
    });
    // return res.json({ message: "Nothingggg" });
  } catch (err) {
    console.error("Stripe error:", err);
    return res.status(500).json({ message: "Stripe error" });
  }
};

// POST /webhook
export const stripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"];
  if (!sig || typeof sig !== "string") {
    return res.status(400).send("Missing or invalid Stripe signature");
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    console.error("Webhook verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const { listingId, userId } = session.metadata as {
      listingId: string;
      userId: string;
    };

    // Update listing to featured
    await Listing.findByIdAndUpdate(listingId, { isFeatured: true });

    // Save transaction details
    await Transaction.create({
      userId,
      listingId,
      amount: session.amount_total ? session.amount_total / 100 : 0,
      status: "success",
      stripeSessionId: session.id,
      paymentIntentId: session.payment_intent as string,
    });
  }

  res.json({ received: true });
};
