const express = require('express');
const axios = require('axios');
const Transaction = require('../Schema/model');
require('dotenv').config();
const router = express.Router();

router.post('/initialize', async (req, res) => {
    const { amount, email } = req.body;

    if (!amount || !email) {
        return res.status(400).json({ msg: 'Amount and email are required.' });
    }

    try {
        const response = await axios.post(process.env.PAYSTACK_INITIALIZE_URL, {
            amount: amount * 100,
            email: email
        }, {
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        console.log('Paystack response:', response.data);
        const transaction = new Transaction({
            reference: response.data.data.reference,
            amount: amount,
            status: response.data.data.status,
            email: email,
            createdAt: new Date()
        });
        await transaction.save();
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error initializing transaction:', error.message);
        res.status(500).json({ error: 'Failed to initialize transaction' });
    }
});

module.exports = router;