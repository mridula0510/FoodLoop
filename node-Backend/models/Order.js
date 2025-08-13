// models/Order.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const orderItemSchema = new Schema({
  name: String,
  price: Number,
  qty: Number,
  menuId: { type: Schema.Types.ObjectId, ref: "MenuItem", required: false }
});

const orderSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: "User", required: false },
  items: [orderItemSchema],
  total: { type: Number, required: true, default: 0 },
  status: { type: String, enum: ["placed", "preparing", "ready", "completed", "cancelled"], default: "placed" },
  outlet: { type: Schema.Types.ObjectId, ref: "Outlet", required: false },
  meta: Schema.Types.Mixed
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
