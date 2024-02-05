// controllers/addressController.js
import Address from "../models/AddressModel.js";
import User from "../models/UserModel.js";

// Create a new address for a user
const createAddress = async (req, res) => {
  const { userId, ...addressData } = req.body;

  try {
    // Check if the provided userId exists in the User collection
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create the address
    const newAddress = await Address.create({ ...addressData, userId });

    res.status(201).json(newAddress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get addresses by userId
const getAddressesByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const addresses = await Address.find({ userId });
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an address
const updateAddress = async (req, res) => {
  const addressId = req.params.addressId;
  const { userId, ...updateData } = req.body;

  try {
    // Check if the provided addressId exists in the Address collection
    const address = await Address.findById(addressId);
    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }

    // Check if the userId matches the userId associated with the address
    if (address.userId !== userId) {
      return res.status(403).json({
        error: "Unauthorized. Cannot update address for another user.",
      });
    }

    // Update the address
    await Address.findByIdAndUpdate(addressId, updateData, { new: true });

    res.status(200).json({ message: "Address updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an address
const deleteAddress = async (req, res) => {
  const addressId = req.params.addressId;
  const userId = req.params.userId;

  try {
    // Check if the provided addressId exists in the Address collection
    const address = await Address.findById(addressId);
    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }

    // Check if the userId matches the userId associated with the address
    if (address.userId !== userId) {
      return res.status(403).json({
        error: "Unauthorized. Cannot delete address for another user.",
      });
    }

    // Delete the address
    await Address.findByIdAndDelete(addressId);

    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  createAddress,
  getAddressesByUserId,
  updateAddress,
  deleteAddress,
};
