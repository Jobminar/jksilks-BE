import { Schema, model } from "mongoose";

const feedbackSchema = new Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  review: {
    type: String,
    required: true,
  },
  accountName: {
    type: String,
    required: true,
    trim: true,
  },
  joinedDate: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
  },
  rating: {
    type: Number,
    required: true,
  },
});

const Feedback = model("Feedback", feedbackSchema);

export default Feedback;
