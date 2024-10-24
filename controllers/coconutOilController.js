import CoconutOil from "../models/CoconutOil.js";
import cloudinary from "cloudinary";

// Create a new coconut oil entry
export const createCoconutOil = async (req, res) => {
    try {
        const result = await cloudinary.v2.uploader.upload(req.file.path);

        const coconutOil = new CoconutOil({
            ...req.body,
            image: result.secure_url
        });

        await coconutOil.save();
        res.status(201).json(coconutOil);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all coconut oil entries
export const getAllCoconutOils = async (req, res) => {
    try {
        const coconutOils = await CoconutOil.find();
        res.status(200).json(coconutOils);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single coconut oil entry by ID
export const getCoconutOilById = async (req, res) => {
    try {
        const coconutOil = await CoconutOil.findById(req.params.id);
        if (!coconutOil) {
            return res.status(404).json({ message: 'Coconut oil not found' });
        }
        res.status(200).json(coconutOil);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a coconut oil entry by ID
export const updateCoconutOil = async (req, res) => {
    try {
        let coconutOil = await CoconutOil.findById(req.params.id);
        if (!coconutOil) {
            return res.status(404).json({ message: 'Coconut oil not found' });
        }

        // If a new image is uploaded, upload it to Cloudinary and update the image field
        if (req.file) {
            const result = await cloudinary.v2.uploader.upload(req.file.path);
            req.body.image = result.secure_url;
        }

        coconutOil = await CoconutOil.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(200).json(coconutOil);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a coconut oil entry by ID
export const deleteCoconutOil = async (req, res) => {
    try {
        const coconutOil = await CoconutOil.findByIdAndDelete(req.params.id);
        if (!coconutOil) {
            return res.status(404).json({ message: 'Coconut oil not found' });
        }
        res.status(200).json({ message: 'Coconut oil deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
