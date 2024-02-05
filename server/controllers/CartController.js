import Cart from "../models/CartModel.js";

const addToCart = async (req, res) => {
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
      quantity,
    } = req.body;

    // Validate required fields
    if (!category || !itemname || !price || !code) {
      return res.status(400).json({
        error: "Incomplete data. Please provide all required fields.",
      });
    }

    // Check if the item is already in the cart for the user
    const existingItem = await Cart.findOne({ userId, itemId });

    if (existingItem) {
      // Item already in the cart
      return res.status(401).json({ message: "Item already in the cart." });
    }

    // Create a new cart item
    const newItem = new Cart({
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
      quantity,
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

const getCartByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate userId
    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    // Retrieve cart items by userId
    const cartItems = await Cart.find({ userId });

    res.status(200).json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body; // Corrected from req.param to req.params

    // Validate item ID
    if (!itemId || !userId) {
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

const deleteCartByUserId = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    // Validate userId
    if (!userId || !itemId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    // Delete all items from the cart by userId
    const deletedItems = await Cart.deleteMany({ userId });

    res
      .status(200)
      .json({ message: "Cart items deleted successfully", deletedItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateCartByQty = async (req, res) => {
  try {
    const { userId } = req.params; // Extract userId from params
    const { itemId } = req.params; // Extract itemId from body
    const { quantity } = req.body;

    // Validate userId, itemId, and quantity
    if (!userId || !itemId || !quantity || isNaN(quantity) || quantity <= 0) {
      return res.status(400).json({
        error:
          "Invalid request. Please provide valid userId, itemId, and quantity.",
      });
    }

    // Find the cart item by userId and itemId
    const cartItem = await Cart.findOne({ userId, itemId });

    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found." });
    }

    // Update the quantity
    cartItem.quantity = quantity;

    // Save the updated cart item
    const updatedCartItem = await cartItem.save();

    res.status(200).json(updatedCartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default {
  addToCart,
  getCart,
  getCartByUserId,
  deleteFromCart,
  deleteCartByUserId,
  updateCartByQty,
};
