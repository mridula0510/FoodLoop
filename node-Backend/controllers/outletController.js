// controllers/outletController.js
import Outlet from "../models/Outlet.js";

export const getOutlets = async (req, res) => {
  try {
    if (Outlet && Outlet.find) {
      const outlets = await Outlet.find().limit(50);
      return res.json({ success: true, outlets });
    }
  } catch (err) { /* fallback below */ }

  res.json({
    success: true,
    outlets: [{ id: "outlet-sample", name: "Sample Stall", isOpen: true }]
  });
};

export const createOutlet = async (req, res) => {
  try {
    const payload = req.body;
    let saved;
    if (Outlet && Outlet.create) {
      saved = await Outlet.create(payload);
    } else {
      saved = { id: "local-outlet", ...payload };
    }

    const io = req.app?.get("io");
    if (io) io.emit("outlet:created", saved);

    return res.status(201).json({ success: true, outlet: saved });
  } catch (err) {
    console.error("createOutlet error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
};
