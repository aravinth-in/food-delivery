import express from 'express';
import cors from 'cors';
import { connecToDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import "dotenv/config"

// App configuration
const app = express();
const PORT = 4000;

// Middleware
app.use(express.json());
app.use(cors());

connecToDB();
app.use('/api/food', foodRouter);
app.use('/images', express.static("uploads"));
app.use('/api/user', userRouter);

app.get("/", (req, res) => {
    res.send("Testing API");
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})
