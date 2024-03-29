// authController.js
import User from "../models/UserModel.js";
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
    const admin = await User.findOne({ email });
    // Special check for the email "jksilks@gmail.com"
    if (email === "jksilks@gmail.com") {
      const isAdminPasswordValid = await argon2.verify(
        admin.password,
        password
      );

      if (isAdminPasswordValid) {
        return res.status(200).json({
          message: "Login successful",
          user: "admin",
        });
      } else {
        return res.status(401).json({ message: "Invalid password for admin" });
      }
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verifying the password using argon2
    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Send user information along with the success message
    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        mobileNumber: user.mobileNumber,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
        location: user.location,
        alternateNumber: user.alternateNumber,
      },
    });
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

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default {
  signup,
  login,
  updateProfile,
  getAllUsers,
};
