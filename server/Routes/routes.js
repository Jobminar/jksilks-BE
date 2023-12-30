import express from "express";
import customerController from "../controllers/customerController.js";
import semikanchipattu from '../controllers/semikanchipattu.js'
import lightweightpattu from "../controllers/lightweightpattu.js"
import softsilk from "../controllers/softsilk.js"
import purekanchipattu from "../controllers/purekanchipattu.js"
import exclusivebridalwear from "../controllers/exclusivebridalwear.js"
import purekanjivaramsilk from "../controllers/purekanjivaramsilk.js"
import orders from "../controllers/orders.js"
import signupu from "../controllers/signup.js"
import login from "../controllers/login.js"

const router = express.Router();

router.get("/getcustomer", customerController.getCustomer);

router.post("/postcustomer", customerController.createCustomer);

router.delete("/customer/:customerId", customerController.deleteCustomer);

//Semi Kanchipattu
router.post("/semikanchipattu",semikanchipattu.createsemikanchi);
router.get("/getsemikanchipattu",semikanchipattu.getsemikanchipattu);

//Light weight pattu
router.post("/lightweightpattu",lightweightpattu.createlightweightpattu)
router.get("/getlightweightpattu",lightweightpattu.getlightweightpattu)

//Soft Silks
router.post("/softsilk",softsilk.createsoftsilk)
router.get("/getsoftsilk",softsilk.getsoftsilk)

//Pure Kanchi Pattu
router.post("/purekanchipattu",purekanchipattu.createpurekanchipattu)
router.get("/getpurekanchipattu",purekanchipattu.getpurekanchipattu)

//Exclusive Bridal wear
router.post("/exclusivebridalwear",exclusivebridalwear.createexclusivebridalwear)
router.get("/getexclusivebridalwear",exclusivebridalwear.getexclusivebridalwear)

//Pure Kanjivaram Silks
router.post("/purekanjivaramsilk",purekanjivaramsilk.createpurekanjivaramsilk)
router.get("/getpurekanjivaramsilk",purekanjivaramsilk.getpurekanjivaramsilk)

//order
router.post("/createOrder",orders.createOrder)
router.get("/addItemToOrder/:orderId",orders.addItemToOrder)
router.get("/getAllOrders",orders.getorder)
router.get("/update/:orderId",orders.updateOrder)
router.get("/update/:id",orders.updateOrder)
router.delete("/deleteOrder/:id'",orders.deleteOrder)

//login
router.post("/signup",signupu.createsignup)
router.post("/login",login.createlogin)
// router.delete("/deleteorder/:orderId",orders.deleteOrder)

export default router;
