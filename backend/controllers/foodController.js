import mongoose from "mongoose";
import foodModel from "../models/foodModel.js";
import fs from 'fs';
import path from 'path';

const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });

    try {
        await food.save();
        res.json({ success: true, message: "Food is added successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Some error occured" });
    }
};

const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods});
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Some error occured" });
    }
};

const removeFood = async(req, res) => {
     try {
        const foodIdToDelete = req.params.id;
        const foodItem = await foodModel.findById(foodIdToDelete);
        
        const imagePath = path.join(process.cwd(), 'uploads', foodItem.image);
                fs.unlink(imagePath, (err) => {
            if (err) {
                console.log("Error deleting file:", err);
            } else {
                console.log("File deleted successfully:", imagePath);
            }
        });

        const foodDeleted = await foodModel.findByIdAndDelete(foodIdToDelete);
        res.json({ success: true, data: foodDeleted});
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Some error occured" });
    }   
};

export {
    addFood,
    listFood,
    removeFood
}