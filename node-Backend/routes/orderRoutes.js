// routes/orderRoutes.js
import express from "express";
import { getOrders, createOrder, updateOrderStatus } from "../controllers/orderController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware.optional, getOrders);
router.post("/", createOrder);
router.put("/:id/status", authMiddleware.protected, updateOrderStatus);

export default router;
