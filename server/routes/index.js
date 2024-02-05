import { Router } from "express";
const router = Router();
import CartController from "../controllers/CartController.js";
import { signup, login } from "../controllers/UserController.js";
import adminController from "../controllers/AdminController.js";
import AddressController from "../controllers/AddressController.js";
import InventoryController from "../controllers/InventoryController.js";
import wishlistController from "../controllers/WishListController.js";

import {
  createBillDetails,
  getAllBillDetails,
  getBillDetailsById,
  updateBillDetailsById,
  deleteBillDetailsById,
} from "../controllers/BillDetailsController.js";
import OrderController from "../controllers/OrderController.js";

router.post("/signup", signup);
router.post("/login", login);
// Add more routes as needed
// Create a new bill details entry
router.post("/bill-details", createBillDetails);

// Get all bill details entries
router.get("/bill-details", getAllBillDetails);

// Get a specific bill details entry by ID
router.get("/bill-details/:id", getBillDetailsById);

// Update a specific bill details entry by ID
router.put("/bill-details/:id", updateBillDetailsById);

// Delete a specific bill details entry by ID
router.delete("/bill-details/:id", deleteBillDetailsById);

router.post("/admin/signup", adminController.adminSignup);

// Admin login
router.post("/admin/login", adminController.adminLogin);

// Define routes for getting inventory and adding an item
router.get("/inventory", InventoryController.getInventory);
router.post("/addItem", InventoryController.addItem);
router.put("/inventory/:itemId", InventoryController.updateItemField);
// Delete an item by ID
router.delete("/inventory/:itemId", InventoryController.deleteItem);

// Create a new address
router.post("/create-address", AddressController.createAddress);

// Get addresses by userId
router.get("/addresses/user/:userId", AddressController.getAddressesByUserId);

// Update an address
router.put("/update-address/:addressId", AddressController.updateAddress);

// Delete an address
router.delete("/delete-address", AddressController.deleteAddress);

// Add item to cart
router.post("/add-to-cart", CartController.addToCart);
router.get("/get-cart", CartController.getCart);
// Remove item from cart
router.delete("/remove-from-cart", CartController.deleteFromCart);
router.get("/getCartByUserId/:userId", CartController.getCartByUserId);
router.delete("/deleteCartByUserId", CartController.deleteCartByUserId);
router.put("/update-cart", CartController.updateCartByQty);
//Routes for Whishlist
// Add item to wishlist
router.post("/wishlist/add", wishlistController.addToWishlist);

// Get all wishlist items for a user
router.get("/wishlist/:userId", wishlistController.getWishlistItems);

// Delete item from wishlist
router.delete("/wishlist/delete", wishlistController.deleteFromWishlist);
// New route for getting all orders
router.post("/create-order", OrderController.createOrder);
router.get("/orders/user/:userId", OrderController.getOrdersByUserId);
router.get(
  "/orders/status/:orderStatus",
  OrderController.getOrdersByOrderStatus
);
router.get("/orders/all", OrderController.getAllOrders);

export default router;
