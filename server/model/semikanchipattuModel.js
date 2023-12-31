import mongoose from "mongoose";

const Semikanchi = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    material: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    sareelength: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    dimensions: {
        type: String,
        required: true
    },
    wash: {
        type: String,
        required: true
    },
    image: {
        type: [String],
        required: true
    }
});

const SemiKanchipattu = mongoose.model('SemiKanchipattu', Semikanchi);

export default SemiKanchipattu;
