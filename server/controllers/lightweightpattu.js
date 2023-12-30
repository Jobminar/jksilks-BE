import Lightweightpattu from "../model/lightweightpattuModel.js";

const lightweightpattu = {
    getlightweightpattu: async (req, res) => {
      try {
        const customers = await Lightweightpattu.find();
        res.status(200).json(customers);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },

    createlightweightpattu:[async (req, res) => {
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

        const newLightweight = new Lightweightpattu({
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
        const saved = await newLightweight.save();

        res.status(201).json(saved);

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}]
}

export default lightweightpattu