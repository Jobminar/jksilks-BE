import mongoose from "mongoose";

const singleOrderSchema = new mongoose.Schema({
  addressId: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
  cartIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cart" }],
  totalAmount: { type: Number, required: true },
  payment: { type: String, required: true },
  orderStatus: { type: String, required: true },
});

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  orders: [singleOrderSchema],
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

// Export the Order model as default
export default Order;
