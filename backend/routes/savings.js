const express = require("express");
const router = express.Router();
const Saving = require("../models/Saving");

// POST: Add a new saving
router.post("/", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ message: "Invalid amount." });
    }

    const existingSavings = await Saving.find();
    const currentTotal = existingSavings.reduce((sum, saving) => sum + saving.amount, 0);

    const now = new Date();
    const saving = new Saving({
      amount,
      currentAmount: amount,
      totalAmount: currentTotal + amount,
      date: now.toISOString().split("T")[0],
      today: now.toDateString(),
      time: now.toTimeString().split(" ")[0],
    });

    const savedData = await saving.save();
    res.status(201).json(savedData);
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ message: "Server error." });
  }
});

// GET: Fetch all savings
router.get("/", async (req, res) => {
  try {
    const savings = await Saving.find();
    res.json(savings);
  } catch (error) {
    console.error("Error in GET /api/savings:", error.message);
    res.status(500).json({ error: "Failed to fetch savings." });
  }
});

// DELETE: Remove a saving by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSaving = await Saving.findByIdAndDelete(id);

    if (!deletedSaving) {
      return res.status(404).json({ message: "Saving not found." });
    }

    res.status(200).json({ message: "Saving deleted successfully." });
  } catch (error) {
    console.error("Error deleting saving:", error.message);
    res.status(500).json({ error: "Failed to delete saving." });
  }
});

// PUT: Update a saving by ID (for subtracting or adding amount)
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract id from the URL parameter
    const { amount } = req.body; // Extract the amount from the request body

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ message: "Invalid amount." });
    }

    const saving = await Saving.findById(id); // Find the saving by id
    if (!saving) {
      return res.status(404).json({ message: "Saving not found." });
    }

    // Adjust the amount (subtract or add based on the sign of the amount)
    saving.amount += amount;  // Adding or subtracting the amount
    saving.totalAmount += amount; // Update the totalAmount as well (if applicable)

    const updatedSaving = await saving.save(); // Save the updated saving
    res.status(200).json(updatedSaving); // Respond with the updated saving
  } catch (error) {
    console.error("Error updating saving:", error.message);
    res.status(500).json({ error: "Failed to update saving." });
  }
});



module.exports = router;



