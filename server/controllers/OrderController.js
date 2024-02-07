// controllers/orderController.js
import Order from "../models/orderModel.js";
import User from "../models/UserModel.js";
import Cart from "../models/CartModel.js"; // Import the Cart model

// Create a new order or add an order to an existing document
const createOrder = async (req, res) => {
  const { userId, orders, addressId, ...orderData } = req.body;

  try {
    if (!userId) {
      return res
        .status(400)
        .json({ error: "Invalid request. Missing userId." });
    }

    // Check if the requester is a user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the order document for the given user
    let orderDocument = await Order.findOne({ userId });

    // If the user doesn't have an existing order document, create a new one
    if (!orderDocument) {
      orderDocument = new Order();
    }

    // Add the new orders to the orders array
    if (orders && Array.isArray(orders)) {
      // Add the addressId to each order in the array
      const ordersWithAddress = orders.map((order) => ({
        ...order,
        userId,
        address: addressId,
      }));
      orderDocument.orders.push(...ordersWithAddress);
    } else {
      // If orders is not an array, treat it as a single order
      const orderWithAddress = {
        ...orderData,
        userId,
        address: addressId,
      };
      orderDocument.orders.push(orderWithAddress);
    }

    // Save the updated order document
    await orderDocument.save();

    // Get the cart records with the cartIds from the orders
    const cartIds = orders.map((order) => order.cartId).flat();
    const carts = await Cart.find({ _id: { $in: cartIds } });

    res.status(201).json({ orders: orderDocument.orders, carts });
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

// Get orders with payment status "yes"
const getPaymentStatusOrders = async (req, res) => {
  try {
    const orders = await Order.find({ "orders.payment": "yes" });
    res.status(200).json(orders.map((orderDocument) => orderDocument.orders));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update order status by orderId
const updateOrderStatus = async (req, res) => {
  const orderId = req.params.orderId;
  const newStatus = req.body.newStatus;

  try {
    const orderDocument = await Order.findOne({ "orders._id": orderId });

    if (!orderDocument) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Find and update the specific order status
    const orderToUpdate = orderDocument.orders.find(
      (order) => order._id == orderId
    );
    if (orderToUpdate) {
      orderToUpdate.orderStatus = newStatus;
      await orderDocument.save();
      res.status(200).json(orderToUpdate);
    } else {
      return res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  createOrder,
  getOrdersByUserId,
  getOrdersByOrderStatus,
  getAllOrders,
  updateOrderStatus,
  getPaymentStatusOrders,
};
