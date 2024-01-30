// controllers/ItemController.js
import ItemModel from "../models/Item.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const getInventory = async (_req, res) => {
  try {
    const items = await ItemModel.find();
    res.status(200).json({ items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addItem = async (req, res) => {
  try {
    upload.fields([
      { name: "itemImage1" },
      { name: "itemImage2" },
      { name: "itemImage3" },
      { name: "itemImage4" },
    ])(req, res, async (err) => {
      if (err) {
        console.error(err);

        if (err instanceof multer.MulterError) {
          return res.status(400).json({ message: "File upload error" });
        }

        return res.status(500).json({ message: "Internal server error" });
      }

      const {
        category,
        itemname,
        price,
        code,
        stitchingOptions,
        fabric,
        washCare,
        length,
        description,
      } = req.body;

      // Validate required fields
      if (!category || !itemname || !price || !code) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const itemImages = {
        itemImage1: req.files["itemImage1"]
          ? req.files["itemImage1"][0].buffer.toString("base64")
          : "",
        itemImage2: req.files["itemImage2"]
          ? req.files["itemImage2"][0].buffer.toString("base64")
          : "",
        itemImage3: req.files["itemImage3"]
          ? req.files["itemImage3"][0].buffer.toString("base64")
          : "",
        itemImage4: req.files["itemImage4"]
          ? req.files["itemImage4"][0].buffer.toString("base64")
          : "",
      };

      const newItem = {
        category,
        itemname,
        price,
        code,
        stitchingOptions,
        fabric,
        washCare,
        length,
        description,
        ...itemImages,
      };

      // Save the new item to the database
      await ItemModel.create(newItem);

      res.status(201).json({ message: "Item added successfully" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding item to inventory" });
  }
};

export default {
  getInventory,
  addItem,
};
