const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    reference: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    status: { type: String  },
    email: { type: String, required: true },
    // createdAt: { type: Date, default: Date.now } 
})

module.exports = mongoose.model('Transaction', TransactionSchema);