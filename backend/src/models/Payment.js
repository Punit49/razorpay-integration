import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(  {
    orderId:   { type: String, required: true, unique: true },
    paymentId: { type: String },
    signature: { type: String },
    amount:    { type: Number, required: true },   // in paise
    currency:  { type: String, default: "INR" },
    product:   { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    user:      { type: String, default: "6aeb03d2441c950f3916581d" },
    status:    { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
  },
  { timestamps: true }
)

export default mongoose.model("Payment", paymentSchema);