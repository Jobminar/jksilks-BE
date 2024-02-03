import { Router } from "express";
const router = Router();
import CartController from "../controllers/CartController.js";
import { signup, login } from "../controllers/UserController.js";
import adminController from "../controllers/AdminController.js";
import SelectAddressController from "../controllers/SelectAddressController.js";
import InventoryController from "../controllers/InventoryController.js";
import wishlistController from "../controllers/WishListController.js";
import OrderController from "../controllers/OrderController.js";
import {
  createBillDetails,
  getAllBillDetails,
  getBillDetailsById,
  updateBillDetailsById,
  deleteBillDetailsById,
} from "../controllers/BillDetailsController.js";

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

// Get admin inventory

// Add item to admin inventory

// Define routes for getting inventory and adding an item
router.get("/inventory", InventoryController.getInventory);
router.post("/addItem", InventoryController.addItem);
router.put("/inventory/:itemId", InventoryController.updateItemField);
// Delete an item by ID
router.delete("/inventory/:itemId", InventoryController.deleteItem);

// Get all orders
router.get("/admin/:adminId/orders", OrderController.getAllOrders);

// Get order by ID
router.get("/admin/:adminId/orders/:orderId", OrderController.getOrderById);

// Create a new order
router.post("/admin/:adminId/orders/create", OrderController.createOrder);

// Update an order
router.put(
  "/admin/:adminId/orders/:orderId/update",
  OrderController.updateOrder
);

// Delete an order
router.delete(
  "/admin/:adminId/orders/:orderId/delete",
  OrderController.deleteOrder
);
router.post("/addresses", SelectAddressController.addUserAddress);

// Route for updating an address by ID
router.put("/addresses/:addressId", SelectAddressController.updateUserAddress);

// Route for deleting an address by ID
router.delete(
  "/addresses/:addressId",
  SelectAddressController.deleteUserAddress
);

// Route for getting an address by ID
router.get(
  "/addresses/:addressId",
  SelectAddressController.getAllUserAddresses
);

// Add item to cart
router.post("/add-to-cart", CartController.addToCart);
router.get("/get-cart", CartController.getCart);
// Remove item from cart
router.delete("/remove-from-cart", CartController.deleteFromCart);
router.get("/getCartByUserId", CartController.getCartByUserId);
router.delete("/deleteCartByUserId", CartController.deleteCartByUserId);
//Routes for Whishlist
router.post("/wishlist/add", wishlistController.addToWishlist);
router.get("/wishlist/:userId", wishlistController.getWishlistByUserId);
router.post("/wishlist/remove", wishlistController.removeFromWishlist);

export default router;
