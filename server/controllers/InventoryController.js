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
    upload.single("itemImage")(req, res, async (err) => {
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
      if (!itemname || !price || !code) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const itemImage = req.file;

      if (!itemImage) {
        console.log("Warning: itemImage is empty");
        // Handle the case where itemImage is empty (e.g., provide a default image)
      }

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
        itemImage: itemImage ? itemImage.buffer.toString("base64") : "",
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
