// userAddressModel.js
import { Schema, model } from "mongoose";

const userAddressSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  houseNumber: {
    type: Number,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  landmark: {
    type: String,
  },
});

const UserAddress = model("UserAddress", userAddressSchema);

export default UserAddress;
