import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import {
  createCheckoutSession,
  //   stripeWebhook,
} from "../controllers/transaction.controller";
const router = express.Router();

// create session (authenticated)
router.post("/create-checkout-session", isAuthenticated, createCheckoutSession);

// webhook (raw body)
// router.post(
//   "/webhook",
//   express.raw({ type: "application/json" }),
//   stripeWebhook
// );

export default router;
