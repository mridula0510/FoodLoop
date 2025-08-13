// routes/outletRoutes.js
import express from "express";
import { getOutlets, createOutlet } from "../controllers/outletController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getOutlets);
router.post("/", authMiddleware.protected, createOutlet);

export default router;
