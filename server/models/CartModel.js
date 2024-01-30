import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: false },
  category: { type: String, required: false },
  itemName: { type: String, required: false },

  price: { type: String, required: false },
  code: { type: String, required: false },
  stitchingOptions: { type: Boolean, default: false },
  fabric: { type: String },
  blendWashcare: { type: String },
  length: { type: String },
  itemImage1: { type: String },
  itemImage2: { type: String },
  itemImage3: { type: String },
  itemImage4: { type: String },
  quantity: { type: Number, required: false },
  payment: Boolean,
  orderStatus: { type: String, required: false },
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
