// controllers/orderController.js
import Order from "../models/orderModel.js";
import User from "../models/UserModel.js";
import Cart from "../models/CartModel.js";
import Address from "../models/AddressModel.js";

// Create a new order or add an order to an existing document
const createOrder = async (req, res) => {
  try {
    const { userId, addressId, cartIds, totalAmount, payment, orderStatus } =
      req.body;

    if (!userId || !Array.isArray(cartIds) || cartIds.length === 0) {
      return res
        .status(400)
        .json({ error: "Invalid request. Missing userId or cartIds." });
    }

    // Check if the requester is a user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if all cart IDs exist in the Cart collection
    const cartsExist =
      (await Cart.find({ _id: { $in: cartIds } }).countDocuments()) ===
      cartIds.length;

    if (!cartsExist) {
      return res.status(400).json({ error: "One or more carts do not exist" });
    }

    // Check if the address ID exists in the Address collection
    const addressExists = await Address.exists({ _id: addressId });

    if (!addressExists) {
      return res.status(400).json({ error: "Address does not exist" });
    }

    // Find the order document for the given user
    let orderDocument = await Order.findOne({ userId });

    // If the user doesn't have an existing order document, create a new one
    if (!orderDocument) {
      orderDocument = new Order({ userId });
    }

    // Add the new order to the orders array
    const orderWithAddress = {
      userId, // Add the userId to the order
      addressId,
      cartIds,
      totalAmount,
      payment,
      orderStatus,
    };

    orderDocument.orders.push(orderWithAddress);

    // Save the updated order document
    await orderDocument.save();

    // Get the cart records with the cartIds from the order
    const carts = await Cart.find({ _id: { $in: cartIds } });

    res.status(201).json({ orders: orderDocument.orders, carts });
  } catch (error) {
    console.error("Error creating order:", error);

    // Handle specific errors
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ error: "Validation error. Check your input." });
    }

    // Handle other errors
    res.status(500).json({ error: "Internal server error" });
  }
};
const getOrdersByUserId = async (req, res) => {
  const userId = req.params.userId;

  try {
    const orderDocument = await Order.findOne({ userId });

    if (!orderDocument) {
      return res
        .status(404)
        .json({ error: "User not found or no orders available" });
    }

    // Extract cartIds and addressId from each order
    const { orders } = orderDocument;
    const cartIds = orders.map((order) => order.cartIds).flat();
    const addressIds = orders
      .map((order) => order.orders.map((order) => order.addressId))
      .flat();

    // Retrieve complete carts and addresses docs
    const carts = await Cart.find({ _id: { $in: cartIds } }).populate({
      path: "items.productId",
      select:
        "userId category itemname price code stitchingOptions fabric washCare length description itemImage1 quantity itemId",
    });

    const addresses = await Address.find({ _id: { $in: addressIds } });

    res.status(200).json({ orders, carts, addresses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    // Extract cartIds and addressId from each order
    const cartIds = orders.map((order) => order.cartIds).flat();
    const addressIds = orders
      .map((order) => order.orders.map((order) => order.addressId))
      .flat();

    // Retrieve complete carts and addresses docs
    const carts = await Cart.find({ _id: { $in: cartIds } }).populate({
      path: "items.productId",
      select:
        "userId category itemname price code stitchingOptions fabric washCare length description itemImage1 quantity itemId",
    });

    const addresses = await Address.find({ _id: { $in: addressIds } });

    res.status(200).json({ orders, carts, addresses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getOrdersByOrderStatus = async (req, res) => {
  const orderStatus = req.params.orderStatus;
  try {
    const orders = await Order.find({ "orders.orderStatus": orderStatus });

    // Extract cartIds and addressId from each order
    const cartIds = orders.map((order) => order.cartIds).flat();
    const addressIds = orders.map((order) => order.addressId);

    // Retrieve complete carts and addresses docs
    const carts = await Cart.find({ _id: { $in: cartIds } }).populate(
      "items.productId",
      "name price"
    );
    const addresses = await Address.find({ _id: { $in: addressIds } });

    res.status(200).json({ orders, carts, addresses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPaymentStatusOrders = async (req, res) => {
  try {
    const orders = await Order.find({ "orders.payment": "yes" });

    // Extract cartIds and addressId from each order
    const cartIds = orders.map((order) => order.cartIds).flat();
    const addressIds = orders.map((order) => order.addressId);

    // Retrieve carts and addresses docs
    const carts = await Cart.find({ _id: { $in: cartIds } });
    const addresses = await Address.find({ _id: { $in: addressIds } });

    res.status(200).json({ orders, carts, addresses });
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
