import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
// import helmet from "helmet";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
// import { errorHandler } from "./middlewares/errorHandler";
import authRoutes from "./routes/auth.routes";
import listingRoutes from "./routes/listing.routes";
import transactionRoutes from "./routes/transaction.routes";
// import { stripeWebhook } from "./controllers/transaction.controller";
import connectDB from "./config/db";
import { stripeWebhook } from "./controllers/transaction.controller";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const app = express();

// import app from "./app";

app.use(
  cors({
    origin: process.env.FRONTEND_URL, // your Next.js frontend
    credentials: true, // allow cookies to be sent
  })
);

// app.use(cors(corsOptions));

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

console.log("Stripe key in server.ts-", process.env.STRIPE_SECRET_KEY);

app.use(cookieParser());
app.use(express.json({ limit: "200mb" }));
// app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "200mb" }));

connectDB();

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/listing", listingRoutes);
app.use("/api/v1/transaction", transactionRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  console.error("MONGO_URI not defined");
  process.exit(1);
}

// (async () => {
//   try {
//     await connectDB(MONGO_URI);
//     app.listen(PORT, () =>
//       console.log(`Server listening on http://localhost:${PORT}`)
//     );
//   } catch (err) {
//     console.error("Failed to start server:", err);
//     process.exit(1);
//   }
// })();

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
  // connectDB();
});
