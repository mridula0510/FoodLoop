// controllers/orderController.js
import Order from "../models/Order.js";

/**
 * Get orders (DB if connected, fallback sample)
 */
export const getOrders = async (req, res) => {
  try {
    if (Order && Order.find) {
      const orders = await Order.find().sort({ createdAt: -1 }).limit(100);
      return res.json({ success: true, orders });
    }
  } catch (err) {
    // fall back
  }

  return res.json({
    success: true,
    orders: [{ id: "sample-1", items: [{ name: "Sample Food", qty: 1 }], total: 99, status: "placed" }]
  });
};

/**
 * Create order + emit socket event
 */
export const createOrder = async (req, res) => {
  try {
    const payload = req.body;
    let saved;
    if (Order && Order.create) {
      saved = await Order.create({
        ...payload,
        total: payload.total || (payload.items || []).reduce((s, it) => s + (it.price || 0) * (it.qty || 1), 0)
      });
    } else {
      saved = { id: "local-sample", ...payload, createdAt: new Date() };
    }

    const io = req.app?.get("io");
    if (io) io.emit("order:new", saved);

    return res.status(201).json({ success: true, order: saved });
  } catch (err) {
    console.error("createOrder error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

/**
 * Update order status
 */
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    let updated;
    if (Order && Order.findByIdAndUpdate) {
      updated = await Order.findByIdAndUpdate(id, { status }, { new: true });
    } else {
      updated = { id, status, updatedAt: new Date() };
    }

    const io = req.app?.get("io");
    if (io) {
      io.to(`order:${id}`).emit("order:status", { id, status });
      io.emit("order:updated", { id, status });
    }

    return res.json({ success: true, order: updated });
  } catch (err) {
    console.error("updateOrderStatus error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
};
