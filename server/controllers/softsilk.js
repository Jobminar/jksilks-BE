import SoftSilk from "../model/softsilkModel.js";



const SoftSilks = {
    getsoftsilk: async (req, res) => {
      try {
        const customers = await SoftSilk.find();
        res.status(200).json(customers);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },

    createsoftsilk:[async (req, res) => {
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

        const newSoftsilk = new SoftSilk({
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
        const saved = await newSoftsilk.save();

        res.status(201).json(saved);

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}]
}

export default SoftSilks