const express = require('express');
const axios = require('axios');
// const bodyParser = require('body-parser');
const crypto = require('crypto');
const router = express.Router();

const app = express();

router.post(
  '/paystack/webhook',
 express.raw({ type: 'application/json' }),
  (req, res) => {
    console.log('Webhook received');

    // ✅ 1. Verify Paystack signature
    const secret = process.env.PAYSTACK_API_KEY;
    const signature = req.headers['x-paystack-signature'];

    const hash = crypto
      .createHmac('sha512', secret)
      .update(req.body)
      .digest('hex');

    if (hash !== signature) {
      console.error('Invalid signature');
      return res.sendStatus(400);
    }

    // ✅ 2. Parse the raw body AFTER verification
    const event = JSON.parse(req.body.toString());

    console.log('Event:', event.event);

    // ✅ 3. Handle event
    if (event.event === 'charge.success') {
      const reference = event.data.reference;
      console.log(`Processing payment reference: ${reference}`);

      // TODO: update DB, confirm payment, etc.
    }

    // ✅ 4. Always respond 200
    res.sendStatus(200);
  }
);

module.exports = router;

// app.post('/paystack/webhook', json(), async (req, res) => {
//     const event = req.body;
//     console.log('Webhook received');

//     console.log('Headers:', req.headers);
//     console.log('Body (raw):', req.body.toString());

//     if (event.event === 'charge.success') {
//         const reference = event.data.reference;
//         console.log(`Processing webhook for reference: ${reference}`);
//         try {
//         } catch (error) {

//         }
//     }
// });