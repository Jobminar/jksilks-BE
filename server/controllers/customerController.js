import multer from "multer";
import Customer from "../model/customerModel.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const customerController = {
  getCustomer: async (req, res) => {
    try {
      const customers = await Customer.find();
      res.status(200).json(customers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createCustomer: [
    upload.single("image"),
    async (req, res) => {
      try {
        const { name, email, mobileNumber, registrationDate, customerType } =
          req.body;

        if (!req.file) {
          return res.status(400).json({ error: "Image file is required" });
        }

        const image = req.file.buffer.toString("base64");

        if (!name || !email || !mobileNumber) {
          return res
            .status(400)
            .json({ error: "Name, email, and mobileNumber are required" });
        }

        const customer = new Customer({
          name,
          email,
          mobileNumber,
          registrationDate,
          customerType,
          image,
        });
        const savedCustomer = await customer.save();

        res.status(201).json(savedCustomer);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    },
  ],

  deleteCustomer: async (req, res) => {
    try {
      const { customerId } = req.params;

      const customer = await Customer.findById(customerId);

      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }

      await Customer.deleteOne({ _id: customerId });

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default customerController;
