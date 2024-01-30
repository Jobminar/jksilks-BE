// userAddressController.js
import UserAddress from "../models/SelectAddressModel.js";

const getAllUserAddresses = async (_req, res) => {
  try {
    const userAddresses = await UserAddress.find();
    res.status(200).json({ userAddresses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addUserAddress = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      country,
      state,
      city,
      houseNumber,
      street,
      landmark,
    } = req.body;

    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !country ||
      !state ||
      !city ||
      !houseNumber ||
      !street
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newUserAddress = new UserAddress({
      firstName,
      lastName,
      country,
      state,
      city,
      houseNumber,
      street,
      landmark,
    });

    await newUserAddress.save();

    res.status(201).json({
      message: "User address added successfully",
      userAddress: newUserAddress,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding user address" });
  }
};

const updateUserAddress = async (req, res) => {
  try {
    const addressId = req.params.addressId;
    const {
      firstName,
      lastName,
      country,
      state,
      city,
      houseNumber,
      street,
      landmark,
    } = req.body;

    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !country ||
      !state ||
      !city ||
      !houseNumber ||
      !street
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Find and update the user address
    const updatedUserAddress = await UserAddress.findByIdAndUpdate(
      addressId,
      {
        firstName,
        lastName,
        country,
        state,
        city,
        houseNumber,
        street,
        landmark,
      },
      { new: true }
    );

    if (!updatedUserAddress) {
      return res.status(404).json({ message: "User address not found" });
    }

    res.status(200).json({
      message: "User address updated successfully",
      userAddress: updatedUserAddress,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user address" });
  }
};

const deleteUserAddress = async (req, res) => {
  try {
    const addressId = req.params.addressId;

    // Find and delete the user address
    const deletedUserAddress = await UserAddress.findByIdAndRemove(addressId);

    if (!deletedUserAddress) {
      return res.status(404).json({ message: "User address not found" });
    }

    res.status(200).json({
      message: "User address deleted successfully",
      userAddress: deletedUserAddress,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user address" });
  }
};

export default {
  getAllUserAddresses,
  addUserAddress,
  updateUserAddress,
  deleteUserAddress,
};
