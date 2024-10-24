import express from "express";

import multer from "multer";
import cloudinary from "cloudinary";

import { createCoconutOil, deleteCoconutOil, getAllCoconutOils, getCoconutOilById, updateCoconutOil } from "../controllers/coconutOilController.js";



const router = express.Router();


const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    }
});

const imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error("Only image files are accepted!"), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFilter });


cloudinary.config({
    cloud_name: "dg7kcjtlu",
    api_key: "189726296272932",
    api_secret: "dMrT32-k3AGZV_6ruShFRIhGdNM"
  });

// Create a new coconut oil entry
router.post('/', upload.single("image"), createCoconutOil);

// Get all coconut oil entries
router.get('/', getAllCoconutOils);

// Get a single coconut oil entry by ID
router.get('/:id', getCoconutOilById);

// Update a coconut oil entry by ID
router.put('/:id', updateCoconutOil);

// Delete a coconut oil entry by ID
router.delete('/:id', deleteCoconutOil);

export default router;


