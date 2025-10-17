import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import { errorHandler } from "./middlewares/errorHandler";
import authRoutes from "./routes/auth.routes";
import listingRoutes from "./routes/listing.routes";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));
app.use(cookieParser());

// const corsOptions = {
//   origin: process.env.FRONTEND_URL,
//   credentials: true,
// };

// app.use(cors(corsOptions));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/listing", listingRoutes);

app.use(errorHandler);
export default app;
