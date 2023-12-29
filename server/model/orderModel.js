import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  items: [
    {
      productName: {
        type: String,
        required: true,
        trim: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  orderDate: {
    type: Date,
    default: Date.now,
  },
  deliveryDate: {
    type: Date,
  },
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
});

const Order = model("Order", orderSchema);

export default Order;
