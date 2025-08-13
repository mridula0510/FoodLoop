// models/User.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["customer", "vendor", "admin"], default: "customer" }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", userSchema);
