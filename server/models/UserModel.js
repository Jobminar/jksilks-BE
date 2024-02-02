// userModel.js
import { Schema, model } from "mongoose";

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  alternateNumber: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = model("User", userSchema);

export default User;
