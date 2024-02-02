// authController.js
import User from "../models/userModel";
import argon2 from "argon2";

export const signup = async (req, res) => {
  try {
    const {
      fullName,
      mobileNumber,
      email,
      gender,
      dateOfBirth,
      location,
      alternateNumber,
      password,
    } = req.body;

    // Hashing the password using argon2
    const hashedPassword = await argon2.hash(password);

    const user = new User({
      fullName,
      mobileNumber,
      email,
      gender,
      dateOfBirth,
      location,
      alternateNumber,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verifying the password using argon2
    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // You can generate a JWT token here and send it in the response if login is successful

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullName, mobileNumber, location, alternateNumber } = req.body;

    // You might want to add authentication here to ensure that the request is coming from an authenticated user

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id, // Assuming you have middleware to extract the user from the token and set it in the request object
      {
        fullName,
        mobileNumber,
        location,
        alternateNumber,
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default {
  signup,
  login,
  updateProfile,
};
