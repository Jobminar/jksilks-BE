import express from "express";
import customerController from "../controllers/customerController.js";

const router = express.Router();

router.get("/getcustomer", customerController.getCustomer);

router.post("/postcustomer", customerController.createCustomer);

router.delete("/customer/:customerId", customerController.deleteCustomer);

export default router;
