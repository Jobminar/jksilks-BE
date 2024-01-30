// models/Item.js
import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
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
  itemImage2: String,
  itemImage3: String,
  itemImage4: String,
});

const Item = mongoose.model("Item", itemSchema);

export default Item;
