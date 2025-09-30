import mongoose from "mongoose";

export const connecToDB = async () => {
    await mongoose.connect('mongodb+srv://aravinth_in:<password>@cluster0.8xnwdp6.mongodb.net/food-del')
        .then(() => console.log('Connected to database successfully'))
        .catch((error) => console.log('Database connection failed', error))
}