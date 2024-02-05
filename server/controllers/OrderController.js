// controllers/orderController.js
// controllers/orderController.js
import Order from "../models/orderModel.js";
import Admin from "../models/AdminModel.js";
import User from "../models/UserModel.js";

// Create a new order or add an order to an existing document
const createOrder = async (req, res) => {
  const { userId, adminId, orders, addressId, ...orderData } = req.body;

  try {
    let user;

    // Check if the requester is an admin
    if (adminId) {
      const admin = await Admin.findById(adminId);
      if (!admin) {
        return res.status(401).json({ error: "Admin not found" });
      }

      // Additional admin-related logic can be added here
    } else if (userId) {
      // Check if the requester is a user
      user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Additional user-related logic can be added here
    } else {
      return res
        .status(400)
        .json({ error: "Invalid request. Missing userId or adminId." });
    }

    // Find the order document for the given user or admin
    let orderDocument;

    if (adminId) {
      orderDocument = await Order.findOne({ adminId });
    } else {
      orderDocument = await Order.findOne({ userId });
    }

    // If the user or admin doesn't have an existing order document, create a new one
    if (!orderDocument) {
      orderDocument = new Order();
    }

    // Add the new orders to the orders array
    if (orders && Array.isArray(orders)) {
      // Add the addressId to each order in the array
      const ordersWithAddress = orders.map((order) => ({
        ...order,
        userId,
        adminId,
        address: addressId,
      }));
      orderDocument.orders.push(...ordersWithAddress);
    } else {
      // If orders is not an array, treat it as a single order
      const orderWithAddress = {
        ...orderData,
        userId,
        adminId,
        address: addressId,
      };
      orderDocument.orders.push(orderWithAddress);
    }

    // Save the updated order document
    await orderDocument.save();

    res.status(201).json(orderDocument.orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get orders by userId if payment is 'yes'
const getOrdersByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const orderDocument = await Order.findOne({ userId }).populate(
      "orders.address"
    );

    if (!orderDocument) {
      return res
        .status(404)
        .json({ error: "User not found or no orders available" });
    }

    // Extract only the orders with payment === "yes" and populate the address field
    const orders = orderDocument.orders
      .filter((order) => order.payment === "yes")
      .map((order) => {
        const { address, ...rest } = order.toObject(); // Extract address and other fields
        return { ...rest, address: address._doc }; // Convert address to plain JavaScript object
      });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get orders by orderStatus
const getOrdersByOrderStatus = async (req, res) => {
  const orderStatus = req.params.orderStatus;
  try {
    const orders = await Order.find({ "orders.orderStatus": orderStatus });
    res.status(200).json(orders.map((orderDocument) => orderDocument.orders));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders.map((orderDocument) => orderDocument.orders));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  createOrder,
  getOrdersByUserId,
  getOrdersByOrderStatus,
  getAllOrders,
};
