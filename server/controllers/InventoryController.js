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
    const itemId = req.params.itemId;
    const fieldToUpdate = req.body.field; // The field you want to update
    const updatedValue = req.body.value; // The new value

    const existingItem = await ItemModel.findById(itemId);

    if (!existingItem) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    // Update the specified field
    existingItem[fieldToUpdate] = updatedValue;

    // Save the updated item
    await existingItem.save();

    res
      .status(200)
      .json({ success: true, message: "Item field updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
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
