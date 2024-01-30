import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  category: { type: String, required: true },
  itemName: { type: String, required: true },

  price: { type: String, required: true },
  code: { type: String, required: true },
  stitchingOptions: { type: Boolean, default: false },
  fabric: { type: String },
  blendWashcare: { type: String },
  length: { type: String },
  itemImage1: { type: String },
  itemImage2: { type: String },
  itemImage3: { type: String },
  itemImage4: { type: String },
  quantity: { type: Number, required: true },
  payment: Boolean,
  orderStatus: { type: String, required: true },
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
