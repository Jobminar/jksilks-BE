import Order from "../model/orderModel.js";

export async function getAllOrders(req, res) {
  try {
    const allOrders = await Order.find();
    res.status(200).json(allOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
