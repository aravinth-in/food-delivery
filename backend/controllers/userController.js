import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import mongoose from "mongoose";

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if (!user) {
            return res.json({success: "false", message: "User doesn't exists, please register"});
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.json({success: "false", message: "Password is incorrect, please try again"});
        }

        const token = createToken(user._id);
        return res.json({success: true, token});
    } catch (error) {
        console.log("Error:", error);
        return res.json({success: false, message: "Some error occured"});
    }

}

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingEmail = await userModel.findOne({ email });
        if (existingEmail) {
            return res.json({ success: false, message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email id" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a password of more than 8 digits" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        });
        const saveUser = await newUser.save();

        const token = createToken(saveUser._id);
        return res.json({success: true, token});
    } catch (error) {
        console.log("Error:", error);
        return res.json({success: false, message: "Some error occured"});
    }

}

export {
    loginUser,
    registerUser
}