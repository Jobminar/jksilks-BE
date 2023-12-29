import { hash } from "bcrypt";
import User from "../model/userModel.js";

export async function registerUser(req, res) {
  try {
    const { username, password, mobileNumber } = req.body;

    // Validate input
    if (!username || !password || !mobileNumber) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if the user already exists
    const existingUser = await findOne({
      $or: [{ username }, { mobileNumber }],
    });
    if (existingUser) {
      return res.status(400).json({
        error:
          "User already exists with the provided username or mobile number",
      });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await hash(password, saltRounds);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
      mobileNumber,
    });

    // Save the user to the database
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
