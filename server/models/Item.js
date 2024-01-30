// models/Item.js
import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  category: { type: String, required: true },
  itemname: { type: String, required: true },
  price: { type: String, required: true },
  code: { type: String, required: true },
  stitchingOptions: {
    type: String,
    enum: ["true", "false"],
    default: "false",
  },
  fabric: { type: String },
  washCare: { type: String },
  length: { type: String },
  description: { type: String },
});

const Item = mongoose.model("Item", itemSchema);

export default Item;
