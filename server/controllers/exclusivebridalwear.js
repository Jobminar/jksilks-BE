import Exclusive from "../model/exclusivebridalModel.js";



const exclusivebridalwear = {
    getexclusivebridalwear: async (req, res) => {
      try {
        const customers = await Exclusive.find();
        res.status(200).json(customers);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },

    createexclusivebridalwear:[async (req, res) => {
    try {
        const {
            name,
            model,
            price,
            description,
            brand,
            material,
            color,
            sareelength,
            weight,
            dimensions,
            wash,
            image
        } = req.body;

        if (!image || !price || !name || !model || !brand || !description || !material || !color || !sareelength || !weight || !dimensions || !wash) {
            return res.status(400).send("Please add all the fields");
        }

        const newexclusive = new Exclusive({
            name,
            model,
            price,
            description,
            brand,
            material,
            color,
            sareelength,
            weight,
            dimensions,
            wash,
            image
        });
        const saved = await newexclusive.save();

        res.status(201).json(saved);

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}]
}

export default exclusivebridalwear