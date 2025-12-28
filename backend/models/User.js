import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    phone: {
     type: String,
    required: true,
},

    email: { type: String, unique: true },
    password: String,
    type: {
      type: String,
      enum: ["user", "vendor", "admin"],
      default: "user",
    },
    shopName: String,
    location: String,
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
