import Cart from "../models/CartModel.js";

const addToCart = async (req, res) => {
  try {
    const {
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
      itemImage2,
      itemImage3,
      itemImage4,
    } = req.body;

    // Validate required fields
    if (!category || !itemname || !price || !code) {
      return res.status(400).json({
        error: "Incomplete data. Please provide all required fields.",
      });
    }

    // Create a new cart item
    const newItem = new Cart({
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
      itemImage2,
      itemImage3,
      itemImage4,
    });

    // Save the new item to the database
    const savedItem = await newItem.save();

    res.status(201).json(savedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCart = async (req, res) => {
  try {
    // Retrieve all items from the Cart model
    const cartItems = await Cart.find();

    res.status(200).json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteFromCart = async (req, res) => {
  try {
    const { itemId } = req.body;

    // Validate item ID
    if (!itemId) {
      return res
        .status(400)
        .json({ error: "Item ID is required for deletion." });
    }

    // Find and delete the item by ID
    const deletedItem = await Cart.findByIdAndDelete(itemId);

    if (!deletedItem) {
      return res
        .status(404)
        .json({ error: "Item not found. Unable to delete." });
    }

    res.status(200).json({ message: "Item deleted successfully", deletedItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default {
  addToCart,
  getCart,
  deleteFromCart,
};
