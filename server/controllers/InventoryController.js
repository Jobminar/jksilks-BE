// controllers/ItemController.js
import ItemModel from "../models/Item.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).fields([
  { name: "itemImage1", maxCount: 1 },
  { name: "itemImage2", maxCount: 1 },
  { name: "itemImage3", maxCount: 1 },
  { name: "itemImage4", maxCount: 1 },
]);

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
    // Assuming upload middleware is used here for handling file uploads
    upload(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ success: false, message: "Error uploading files" });
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

      const itemImages = {
        itemImage1:
          req.files && req.files["itemImage1"]
            ? req.files["itemImage1"][0].buffer.toString("base64")
            : null,
        itemImage2:
          req.files && req.files["itemImage2"]
            ? req.files["itemImage2"][0].buffer.toString("base64")
            : null,
        itemImage3:
          req.files && req.files["itemImage3"]
            ? req.files["itemImage3"][0].buffer.toString("base64")
            : null,
        itemImage4:
          req.files && req.files["itemImage4"]
            ? req.files["itemImage4"][0].buffer.toString("base64")
            : null,
      };

      const item = new ItemModel({
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
      });

      await item.save();
      res
        .status(201)
        .json({ success: true, message: "Item added successfully" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateItemField = async (req, res) => {
  try {
    const { itemId } = req.params;
    const updates = req.body;

    const existingItem = await ItemModel.findById(itemId);

    if (!existingItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Update item fields based on user input
    Object.assign(existingItem, updates);

    try {
      // Attempt to save the updated item
      const updatedItem = await existingItem.save();

      console.log("Item updated successfully");
      res
        .status(200)
        .json({ message: "Item updated successfully", item: updatedItem });
    } catch (error) {
      console.error("Error saving updated item:", error);
      console.log("Error updating item in inventory");
      res.status(500).json({ message: "Error updating item in inventory" });
    }
  } catch (error) {
    if (error.code === "RequestHeaderFieldsTooLarge") {
      // Handle 431 error here
      console.log("Request Header Fields Too Large");
      res.status(431).json({ message: "Request Header Fields Too Large" });
    } else {
      console.error(error);
      console.log("Error updating item in inventory");
      res.status(500).json({ message: "Error updating item in inventory" });
    }
  }
};

const deleteItem = async (req, res) => {
  try {
    const { itemId } = req.params; // Destructuring for cleaner access

    const existingItem = await ItemModel.findById(itemId);

    if (!existingItem) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    await existingItem.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export default {
  getInventory,
  addItem,
  updateItemField,
  deleteItem,
};
