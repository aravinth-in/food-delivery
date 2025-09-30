import express from 'express';
import cors from 'cors';
import { connecToDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import { execPath } from 'process';

// App configuration
const app = express();
const PORT = 4000;

// Middleware
app.use(express.json());
app.use(cors());

connecToDB();
app.use('/api/food', foodRouter);
app.use('/images', express.static("uploads"));

app.get("/", (req, res) => {
    res.send("Testing API");
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})
