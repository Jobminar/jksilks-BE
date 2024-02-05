// models/Address.js
import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  houseNumber: { type: String, required: true },
  street: { type: String, required: true },
  landmark: { type: String },
  pincode: { type: String, required: true },
  state: { type: String, required: true },
});

const Address = mongoose.model("Address", addressSchema);

export default Address;
