import express from "express"
import { createOrder, verifyHandler } from "../controllers/payment.controller.js";
const router = express.Router();

router.post("/:productId/orders", createOrder);
router.post("/verify", verifyHandler);

export default router;
