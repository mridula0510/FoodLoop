// models/Outlet.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const outletSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  isOpen: { type: Boolean, default: true },
  location: String,
  // optionally reference menu items if you add MenuItem model later
  menu: [{ type: Schema.Types.ObjectId, ref: "MenuItem" }]
}, { timestamps: true });

export default mongoose.models.Outlet || mongoose.model("Outlet", outletSchema);
