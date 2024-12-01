const mongoose = require('mongoose');

// Define the Saving schema
const savingSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  currentAmount: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  today: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

// Export the Saving model
module.exports = mongoose.model('Saving', savingSchema);
