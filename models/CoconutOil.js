import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CoconutOilSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    seller: {
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    extractionMethod: {
        type: String,
        required: true,
        enum: ['Cold Pressed', 'Expeller Pressed', 'Centrifuge', 'Solvent Extraction']
    },
    volume: {
        type: Number,
        required: true,
        min: 0
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    productionDate: {
        type: Date,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
    organic: {
        type: Boolean,
        default: false
    },
    certification: {
        type: String
    },
    ingredients: [{
        type: String
    }],
    nutritionalInformation: {
        calories: Number,
        fat: Number,
        saturatedFat: Number,
        transFat: Number,
        cholesterol: Number,
        sodium: Number,
        carbohydrate: Number,
        fiber: Number,
        sugar: Number,
        protein: Number
    },
    image:{
        type: String
    }
}, {
    timestamps: true
});

const CoconutOil = mongoose.model('CoconutOil', CoconutOilSchema);
export default CoconutOil;
