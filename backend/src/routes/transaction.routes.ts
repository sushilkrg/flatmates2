import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import {
  createCheckoutSession,
  getMyTransactions,
  //   stripeWebhook,
} from "../controllers/transaction.controller";
const router = express.Router();

// create session (authenticated)
router.post("/create-checkout-session", isAuthenticated, createCheckoutSession);
router.get("/my-transactions", isAuthenticated, getMyTransactions);

// webhook (raw body)
// router.post(
//   "/webhook",
//   express.raw({ type: "application/json" }),
//   stripeWebhook
// );

export default router;
