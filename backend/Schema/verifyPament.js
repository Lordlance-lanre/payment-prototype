const express = require('express');
const axios = require('axios');

const app = express();

const router = express.Router();


router.get('/verify/:reference', async (req, res) => {
    const { reference } = req.params;

    // console.log(`Verifying payment for reference: ${reference}`);

    try {
        const response = await axios.get(`${process.env.PAYSTACK_VERIFY_URL}${reference}`, {
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({ error: 'Failed to verify payment' });
    }
});

module.exports = router;