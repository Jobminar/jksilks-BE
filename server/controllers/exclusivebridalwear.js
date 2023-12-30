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
            image,
            model,
            price,
            description,
            brand,
            material,
            color,
            sareelength,
            weight,
            dimensions,
            blousestitching,
            wash
        } = req.body;

        if (!image || !price || !name || !model || !brand || !description || !material || !color || !sareelength || !weight || !dimensions || !blousestitching || !wash) {
            return res.status(400).send("Please add all the fields");
        }

        const newexclusive = new Exclusive({
            name,
            image,
            model,
            price,
            description,
            brand,
            material,
            color,
            sareelength,
            weight,
            dimensions,
            blousestitching,
            wash
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