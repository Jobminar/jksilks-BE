import Cart from "../models/CartModel.js";

const cartController = {
  addToCart: async (req, res) => {
    try {
      // Extract data from the request body
      const {
        userId,
        itemName,
        price,
        code,
        stitchingOptions,
        fabric,
        washCare,
        length,
        quantity,
      } = req.body;

      // Basic validation - check if required fields are present
      if (!userId || !itemName || !price || !code || !quantity) {
        return res
          .status(400)
          .json({ message: "Invalid request. Missing required fields." });
      }

      // Find the user's cart or create one if it doesn't exist
      let cart = await Cart.findOne({ userId });

      if (!cart) {
        cart = new Cart({
          userId,
          items: [],
        });
      }

      // Check if the item is already in the cart
      const existingItemIndex = cart.items.findIndex(
        (item) => item.code === code
      );

      if (existingItemIndex !== -1) {
        // If the item already exists, update the quantity
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        // If the item is not in the cart, add it
        cart.items.push({
          itemName,
          price,
          code,
          stitchingOptions,
          fabric,
          washCare,
          length,
          quantity,
        });
      }

      // Save the updated cart
      await cart.save();

      res.status(200).json({ message: "Item added to cart successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  removeFromCart: async (req, res) => {
    try {
      // Extract data from the request body
      const { userId, code } = req.body;

      // Basic validation - check if required fields are present
      if (!userId || !code) {
        return res
          .status(400)
          .json({ message: "Invalid request. Missing required fields." });
      }

      // Find the user's cart
      const cart = await Cart.findOne({ userId });

      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      // Check if the item is in the cart
      const existingItemIndex = cart.items.findIndex(
        (item) => item.code === code
      );

      if (existingItemIndex === -1) {
        return res.status(404).json({ message: "Item not found in the cart" });
      }

      // Remove the item from the cart
      cart.items.splice(existingItemIndex, 1);

      // Save the updated cart
      await cart.save();

      res.status(200).json({ message: "Item removed from cart successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

export default cartController;
