import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    address: {
      type: String,
      default: "1150",
    },
    mobile: { type: String,default: "1150" },
    total: Number,
    paymentId: String,
    method: String,
    delivered: {
      type: Boolean,
      default: false,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    dateOfPayment: Date,
  },
  {
    timestamps: true,
  }
);

let Dataset = mongoose.models.order || mongoose.model("order", orderSchema);
export default Dataset;
