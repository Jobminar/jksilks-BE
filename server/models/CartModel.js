import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  // userId: { type: String, required: false },
  category: { type: String, required: false },
  itemname: { type: String, required: false },
  price: { type: String, required: false },
  code: { type: String, required: false },
  stitchingOptions: { type: String, default: false },
  fabric: { type: String },
  washCare: { type: String },
  length: { type: String },
  description: { type: String, required: false },
  itemImage1: { type: String, required: false },
  itemImage2: { type: String, required: false },
  itemImage3: { type: String, required: false },
  itemImage4: { type: String, required: false },
  // quantity: { type: Number, required: false },
  // payment: { type: String },
  // orderStatus: { type: String, required: false },
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
