import SemiKanchipattu from "../model/semikanchipattuModel.js";



const semikanchipattu = {
    getsemikanchipattu: async (req, res) => {
      try {
        const customers = await SemiKanchipattu.find();
        res.status(200).json(customers);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },

    createsemikanchi:[async (req, res) => {
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

        const newSemi = new SemiKanchipattu({
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
        const saved = await newSemi.save();

        res.status(201).json(saved);

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}]
}

export default semikanchipattu