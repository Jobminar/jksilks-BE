import AdminModel from "../models/AdminModel.js";
import { hash, verify } from "argon2";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Create a controller function for admin signup
const adminSignup = async (req, res) => {
  try {
    // Get the admin input
    const { username, password } = req.body;

    // Check if the username already exists
    const existingAdmin = await AdminModel.findOne({
      "adminLogin.username": username,
    });
    if (existingAdmin) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // Hash the password
    const hashedPassword = await hash(password);

    // Create a new admin
    const newAdmin = new AdminModel({
      adminLogin: {
        username,
        password: hashedPassword,
      },
      inventory: {
        freshVegetables: [],
        freshFruits: [],
        offerZone: [],
        quickPicks: [],
      },
      orders: [],
    });

    // Save the admin to the database
    await newAdmin.save();

    // Send a success response
    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    // Handle any errors
    console.error("Error in adminSignup:", error);
    res.status(500).json({ message: "Error creating admin" });
  }
};

// Create a controller function for admin login
const adminLogin = async (req, res) => {
  try {
    // Get the admin input
    const { username, password } = req.body;

    // Check if the username exists
    const admin = await AdminModel.findOne({ "adminLogin.username": username });
    if (!admin) {
      return res.status(404).json({ message: "Username not found" });
    }

    // Verify the password
    const validPassword = await verify(admin.adminLogin.password, password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Send a success response
    res.status(200).json({ message: "Admin logged in successfully" });
  } catch (error) {
    // Handle any errors
    console.error("Error in adminLogin:", error);
    res.status(500).json({ message: "Error logging in admin" });
  }
};

// Create a controller function for getting the inventory
const getInventory = async (_req, res) => {
  try {
    // Find the admin (assuming adminId is not needed anymore)
    const admin = await AdminModel.findOne();

    // Check if the admin exists
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Send the inventory as a response
    res.status(200).json({ inventory: admin.inventory });
  } catch (error) {
    // Handle any errors
    console.error("Error in getInventory:", error);
    res.status(500).json({ message: "Error fetching inventory" });
  }
};

// adding item to inventory
// const addItem = async (req, res) => {
//   try {
//     // Get the category and item details from the request body
//     const {
//       category,
//       itemname,
//       description,
//       units,
//       costPerUnit,
//       discount,
//       quantity,
//     } = req.body;

//     // Process image upload with Multer for multiple images
//     const itemImages = req.files;

//     // Create a new item object
//     const newItem = {
//       itemname,
//       description,
//       units,
//       costPerUnit,
//       discount,
//       quantity,
//       itemImages: itemImages
//         ? itemImages.map((image) => image.buffer.toString("base64"))
//         : [],
//     };

//     // Directly insert the new item into the specified category in the inventory collection
//     const result = await AdminModel.updateOne(
//       {},
//       {
//         $push: {
//           [`inventory.${category}`]: newItem,
//         },
//       }
//     );

//     // Check if the update was successful
//     if (result.nModified === 0) {
//       return res.status(404).json({ message: "Category not found" });
//     }

//     // Send a success response
//     res.status(201).json({ message: "Item added successfully" });
//   } catch (error) {
//     // Handle any errors
//     console.error("Error in addItem:", error);
//     res.status(500).json({ message: "Error adding item to inventory" });
//   }
// };

// Use Multer middleware to handle file uploads for multiple images
const uploadMiddleware = upload.array("itemImages", 5); // assuming max 5 images per item

// Export the controller functions and the Multer middleware yes
export default {
  adminSignup,
  adminLogin,
  getInventory,
  // addItem: [uploadMiddleware, addItem],
  uploadMiddleware,
};
