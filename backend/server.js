const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit server on connection failure
  });

// Schema & Model
const SavingSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  currentAmount: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  date: { type: String, required: true },
  today: { type: String, required: true },
  time: { type: String, required: true },
});
const Saving = mongoose.model("Saving", SavingSchema);

// POST: Add Amount
app.post("/api/savings", async (req, res) => {
  try {
    console.log("POST /api/savings - Request Body:", req.body);
    const { amount } = req.body;

    if (!amount || isNaN(amount)) {
      console.error("Invalid amount received:", amount);
      return res.status(400).json({ error: "Invalid amount." });
    }

    const now = new Date();
    const saving = new Saving({
      amount,
      currentAmount: amount,
      totalAmount: amount,
      date: now.toISOString().split("T")[0],
      today: now.toDateString(),
      time: now.toTimeString().split(" ")[0],
    });

    const savedData = await saving.save();
    console.log("Amount saved successfully:", savedData);
    res.status(201).json({ message: "Amount added successfully." });
  } catch (error) {
    console.error("Error in POST /api/savings:", error.message);
    res.status(500).json({ error: "Failed to add amount." });
  }
});

// GET: Fetch Savings
app.get("/api/savings", async (req, res) => {
  try {
    console.log("GET /api/savings - Fetching all savings");
    const savings = await Saving.find();
    console.log("Savings data fetched:", savings);
    res.json(savings);
  } catch (error) {
    console.error("Error in GET /api/savings:", error.message);
    res.status(500).json({ error: "Failed to fetch savings." });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
