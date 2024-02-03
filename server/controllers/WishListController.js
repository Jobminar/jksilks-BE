import Wishlist from "../models/WishList.js";

const addToWishlist = async (req, res) => {
  try {
    const {
      userId,
      itemId,
      category,
      itemname,
      price,
      code,
      stitchingOptions,
      fabric,
      washCare,
      length,
      description,
      itemImage1,
    } = req.body;

    // Validate required fields
    if (!userId || !itemId) {
      return res.status(400).json({
        error: "Incomplete data. Please provide both userId and itemId.",
      });
    }

    // Check if the item is already in the wishlist for the user
    const existingItem = await Wishlist.findOne({ userId, itemId });

    if (existingItem) {
      // Item already in the wishlist
      return res.status(400).json({ message: "Item already in the wishlist." });
    }

    // Create a new wishlist item
    const newWishlistItem = new Wishlist({
      userId,
      itemId,
      category,
      itemname,
      price,
      code,
      stitchingOptions,
      fabric,
      washCare,
      length,
      description,
      itemImage1,
    });

    // Save the new item to the database
    const savedWishlistItem = await newWishlistItem.save();

    res.status(201).json(savedWishlistItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getWishlistByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate userId
    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    // Retrieve wishlist items by userId
    const wishlistItems = await Wishlist.find({ userId });

    res.status(200).json(wishlistItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { userId, itemId } = req.params;

    // Validate userId and itemId
    if (!userId || !itemId) {
      return res.status(400).json({
        error: "Both User ID and Item ID are required for removal.",
      });
    }

    // Find and delete the item from the wishlist by userId and itemId
    const deletedItem = await Wishlist.findOneAndDelete({ userId, itemId });

    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found in the wishlist." });
    }

    res.status(200).json({
      message: "Item removed from wishlist successfully",
      deletedItem,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default {
  addToWishlist,
  getWishlistByUserId,
  removeFromWishlist,
};
