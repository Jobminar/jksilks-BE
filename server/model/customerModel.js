import { Schema, model } from "mongoose";

const customerSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  customerType: {
    type: String, // Add this line if customerType is part of your schema
  },
});

const Customer = model("Customer", customerSchema);

export default Customer;
