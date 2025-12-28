import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  phone: String,
  experience: String,
  rating: Number,
  services: [String],
  location: String,
});

export default mongoose.model("Vendor", vendorSchema);
