import Purekanchi from "../model/purekanchiModel.js";



const Purekanchipattu = {
    getpurekanchipattu: async (req, res) => {
      try {
        const customers = await Purekanchi.find();
        res.status(200).json(customers);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },

    createpurekanchipattu:[async (req, res) => {
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
            // blousestitching,
            wash
        } = req.body;

        if (!image || !price || !name || !model || !brand || !description || !material || !color || !sareelength || !weight || !dimensions || !wash) {
            return res.status(400).send("Please add all the fields");
        }

        const newpurekanchipattu = new Purekanchi({
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
            // blousestitching,
            wash
        });
        const saved = await newpurekanchipattu.save();

        res.status(201).json(saved);

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}]
}

export default Purekanchipattu