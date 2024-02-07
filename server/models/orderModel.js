import mongoose from "mongoose";

const singleOrderSchema = new mongoose.Schema({
  addressId: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
  cartIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cart" }],
  totalAmount: { type: Number, required: true },
  payment: { type: String, required: true },
  orderStatus: { type: String, required: true },
});

const orderSchema = new mongoose.Schema({
  orders: [singleOrderSchema],
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
