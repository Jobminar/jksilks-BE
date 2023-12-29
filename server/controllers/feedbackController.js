import Feedback from "../model/feedbackModel.js";

export async function getAllFeedback(req, res) {
  try {
    const allFeedback = await find();
    res.status(200).json(allFeedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
