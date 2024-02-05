// models/Order.js
import mongoose from "mongoose";

const singleOrderSchema = new mongoose.Schema({
  category: { type: String, required: true },
  itemname: { type: String, required: true },
  price: { type: Number, required: true },
  code: { type: String, required: true },
  stitchingOptions: { type: String },
  fabric: { type: String },
  washCare: { type: String },
  length: { type: String },
  description: { type: String },
  itemImage1: String,
  payment: { type: String, required: true },
  orderStatus: { type: String, required: true },
  userId: { type: String },
  adminId: { type: String },
  orderDate: { type: Date, default: Date.now },
  address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
});

const orderSchema = new mongoose.Schema({
  orders: [singleOrderSchema],
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
