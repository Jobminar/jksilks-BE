import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  itemId: { type: String, required: true },
  addedAt: { type: Date, default: Date.now },
  category: { type: String, required: false },
  itemname: { type: String, required: false },
  price: { type: Number, required: false },
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
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

export default Wishlist;
