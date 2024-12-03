// added with this code a function that convert time to 12 format 'convetTo12'

import express from "express";
import Saving from "../models/Saving.js";
import convertTo12 from "./convertTime.js";

const router = express.Router();

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
      // time: now.toTimeString().split(" ")[0],
      time: convertTo12(now.toTimeString().split(" ")[0]),
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

// PUT: Update a saving by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, date, today, time } = req.body;

    // Validate inputs
    if (!id || isNaN(amount) || !date || !today || !time) {
      return res.status(400).json({ error: "Invalid input data." });
    }

    // Convert time to 12-hour format before updating
    const formattedTime = convertTo12(time);

    // Find and update the saving entry
    const updatedSaving = await Saving.findByIdAndUpdate(
      id,
      { amount, date, today, time: formattedTime }, // Store formatted time
      { new: true } // Return the updated document
    );

    if (!updatedSaving) {
      return res.status(404).json({ error: "Saving not found." });
    }

    res.json(updatedSaving);
  } catch (error) {
    console.error("Error updating saving:", error);
    res.status(500).json({ error: "Server error." });
  }
});

export default router;


