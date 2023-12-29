import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    enum: [
      "semi kanchipattu",
      "leightweight pattu",
      "soft silk",
      "pure kanchi pattu",
      "pure kanchivaram Silk",
    ],
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Product = model("Product", productSchema);

export default Product;
