import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import jobRoutes from "./routes/job.routes.js";
import vendorRoutes from "./routes/vendor.routes.js";
import authRoutes from "./routes/auth.routes.js";
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/jobs", jobRoutes);
app.use("/api/vendors", vendorRoutes);


app.use("/api/auth", authRoutes);


app.listen(5000, () =>
  console.log("Server running on http://localhost:5000")
);
