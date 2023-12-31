import { Schema, model } from "mongoose";

const orderSchema = Schema({
  userName: { type: String, required: true }, 
  userId: { type: Number, required: true },
  items: [
    {
      name: { type: String, required: true },
      image: { type: [String], required: true },
      model: { type: String, required: true },
      price: { type: Number, required: true },
      description: { type: String, required: true },
      brand: { type: String, required: true },
      material: { type: String, required: true },
      color: { type: String, required: true },
      sareelength: { type: String, required: true },
      weight: { type: String, required: true },
      dimensions: { type: String, required: true },
      // blousestitching: { type: String, required: true },
      wash: { type: String, required: true }
    },
  ],
  orderId: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, required: true },
  address: { type: String, required: true },
  totalPrice: { type: Number, required: true },
});

const Orders = model("Orders", orderSchema);
export default Orders