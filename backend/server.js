const express = require('express');
require('dotenv').config();
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const cors = require('cors');
const frontendUrl = process.env.FRONTEND_URL;

app.use(cors({
  origin: frontendUrl,  // Replace with your frontend URL if different
  credentials: true  // If needed for cookies/auth
}));






const webhookRouter = require('./Schema/webhook');
app.use('/api', webhookRouter);

app.use(express.json());

const initializeRouter = require('./Schema/controller');
app.use('/api/transaction', initializeRouter);

const verifyPaymentRouter = require('./Schema/verifyPament');
app.use('/api/paystack', verifyPaymentRouter);


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected successfully');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    }
};
connectDB();
