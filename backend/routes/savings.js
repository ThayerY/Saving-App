// added with this code a function that convert time to 12 format 'convetTo12'

import express from "express";
import Saving from "../models/Saving.js";
import convertTo12 from "./convertTime.js";

const router = express.Router();


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

// POST: Add a new saving
// router.post("/", async (req, res) => {
//   try {
//     const { amount } = req.body;

//     if (!amount || isNaN(amount)) {
//       return res.status(400).json({ message: "Invalid amount." });
//     }

//     // Fetch the latest total from the existing savings
//     const savings = await Saving.find();
//     const runningTotal = savings.reduce((sum, saving) => sum + saving.amount, 0); // Calculate current total

//     const now = new Date();
//     const saving = new Saving({
//       amount,
//       currentAmount: runningTotal, // Previous total before adding the new amount
//       totalAmount: runningTotal + amount, // Updated total amount
//       date: now.toISOString().split("T")[0],
//       today: now.toLocaleDateString("en-US", { weekday: "long" }),
//       time: convertTo12(now.toTimeString().split(" ")[0]),
//     });

//     const savedData = await saving.save();
//     res.status(201).json(savedData);
//   } catch (error) {
//     console.error("Error saving data:", error);
//     res.status(500).json({ message: "Server error." });
//   }
// });

// POST: Add a new saving
// router.post("/", async (req, res) => {
//   try {
//     const { amount } = req.body;

//     if (!amount || isNaN(amount)) {
//       return res.status(400).json({ message: "Invalid amount." });
//     }

//     const existingSavings = await Saving.find();
//     const currentTotal = existingSavings.reduce((sum, saving) => sum + saving.amount, 0);

//     const now = new Date();
//     const saving = new Saving({
//       amount,
//       currentAmount: existingSavings.length === 0 ? 0 : currentTotal, // Set to 0 if no records
//       totalAmount: currentTotal + amount,
//       date: now.toISOString().split("T")[0],
//       today: now.toLocaleDateString("en-US", { weekday: "long" }),
//       time: convertTo12(now.toTimeString().split(" ")[0]),
//     });

//     const savedData = await saving.save();
//     res.status(201).json(savedData);
//   } catch (error) {
//     console.error("Error saving data:", error);
//     res.status(500).json({ message: "Server error." });
//   }
// });

// POST: Add a new saving
// router.post("/", async (req, res) => {
//   try {
//     const { amount } = req.body;

//     if (!amount || isNaN(amount)) {
//       return res.status(400).json({ message: "Invalid amount." });
//     }

//     // Fetch all existing savings to calculate the total
//     const existingSavings = await Saving.find();
//     const currentTotal = existingSavings.reduce((sum, saving) => sum + saving.amount, 0);

//     const now = new Date();

//     // Create a new saving with correct currentAmount and totalAmount
//     const saving = new Saving({
//       amount,
//       currentAmount: existingSavings.length === 0 ? 0 : currentTotal, // If no records, currentAmount = 0
//       totalAmount: currentTotal + amount,
//       date: now.toISOString().split("T")[0],
//       today: now.toLocaleDateString("en-US", { weekday: "long" }),
//       time: convertTo12(now.toTimeString().split(" ")[0]),
//     });

//     const savedData = await saving.save();
//     res.status(201).json(savedData);
//   } catch (error) {
//     console.error("Error saving data:", error);
//     res.status(500).json({ message: "Server error." });
//   }
// });


// POST: Add a new saving
// router.post("/", async (req, res) => {
//   try {
//     const { amount } = req.body;

//     if (!amount || isNaN(amount)) {
//       return res.status(400).json({ message: "Invalid amount." });
//     }

//     // Calculate the current total
//     const existingSavings = await Saving.find();
//     const currentTotal = existingSavings.reduce((sum, saving) => sum + saving.amount, 0);

//     const now = new Date();

//     // Dynamically calculate the "Today" field based on the current date
//     const today = now.toLocaleDateString("en-US", { weekday: "long" });

//     // Convert time to 12-hour format
//     const formattedTime = convertTo12(now.toTimeString().split(" ")[0]);

//     const saving = new Saving({
//       amount,
//       currentAmount: amount,
//       totalAmount: currentTotal + amount,
//       date: now.toISOString().split("T")[0], // Save date in ISO format
//       today, // Save dynamically calculated "Today" field
//       time: formattedTime, // Save dynamically formatted time
//     });

//     const savedData = await saving.save();
//     res.status(201).json(savedData);
//   } catch (error) {
//     console.error("Error saving data:", error);
//     res.status(500).json({ message: "Server error." });
//   }
// });

// POST: Add a new saving
router.post("/", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ message: "Invalid amount." });
    }

    // Fetch all existing savings to calculate currentAmount and totalAmount
    const existingSavings = await Saving.find();
    const currentTotal = existingSavings.reduce((sum, saving) => sum + saving.amount, 0);

    const now = new Date();

    // Dynamically calculate 'Today' based on the current date
    const today = now.toLocaleDateString("en-US", { weekday: "long" });

    // Convert time to 12-hour format
    const formattedTime = convertTo12(now.toTimeString().split(" ")[0]);

    const saving = new Saving({
      amount,
      currentAmount: currentTotal, // The previous total becomes the currentAmount for this record
      totalAmount: currentTotal + amount, // Add the new amount to the running total
      date: now.toISOString().split("T")[0], // Save date in ISO format
      today, // Dynamically calculated weekday
      time: formattedTime, // Dynamically formatted time
    });

    const savedData = await saving.save();
    res.status(201).json(savedData);
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ message: "Server error." });
  }
});


// DELETE: Remove a saving by ID
// router.delete("/:id", async (req, res) => {

//   try {
//     const { id } = req.params;
//     const deletedSaving = await Saving.findByIdAndDelete(id);

//     if (!deletedSaving) {
//       return res.status(404).json({ message: "Saving not found." });
//     }

//     res.status(200).json({ message: "Saving deleted successfully." });
//   } catch (error) {
//     console.error("Error deleting saving:", error.message);
//     res.status(500).json({ error: "Failed to delete saving." });
//   }
// });

// DELETE: Remove a saving by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the saving with the given ID
    const deletedSaving = await Saving.findByIdAndDelete(id);

    if (!deletedSaving) {
      return res.status(404).json({ message: "Saving not found." });
    }

    // Recalculate currentAmount and totalAmount for remaining records
    const allSavings = await Saving.find();
    let runningTotal = 0;

    for (const saving of allSavings) {
      runningTotal += saving.amount;
      await Saving.findByIdAndUpdate(saving._id, {
        currentAmount: runningTotal - saving.amount,
        totalAmount: runningTotal,
      });
    }

    res.status(200).json({ message: "Saving deleted successfully." });
  } catch (error) {
    console.error("Error deleting saving:", error);
    res.status(500).json({ error: "Failed to delete saving." });
  }
});

// PUT: Update a saving by ID
// router.put("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { amount, date, time } = req.body;

//     if (!id || isNaN(amount) || !date || !time) {
//       return res.status(400).json({ error: "Invalid input data." });
//     }

//     // Fetch all savings and calculate totals dynamically
//     const savings = await Saving.find();
//     let runningTotal = 0;

//     savings.forEach((saving) => {
//       if (saving._id.toString() === id) {
//         saving.amount = amount; // Update the current saving's amount
//         saving.currentAmount = runningTotal; // Assign the previous total as the current amount
//         saving.totalAmount = runningTotal + amount; // Calculate the new total
//         saving.date = date;
//         saving.today = new Date(date).toLocaleDateString("en-US", { weekday: "long" });
//         saving.time = convertTo12(time);
//       }
//       runningTotal += saving.amount; // Update the running total
//     });

//     // Save the updated entry
//     const updatedSaving = await Saving.findByIdAndUpdate(
//       id,
//       {
//         amount,
//         currentAmount: savings.find((saving) => saving._id.toString() === id).currentAmount,
//         totalAmount: savings.find((saving) => saving._id.toString() === id).totalAmount,
//         date,
//         today: new Date(date).toLocaleDateString("en-US", { weekday: "long" }),
//         time: convertTo12(time),
//       },
//       { new: true } // Return the updated document
//     );

//     if (!updatedSaving) {
//       return res.status(404).json({ error: "Saving not found." });
//     }

//     // console.log("Updated saving in database:", updatedSaving);
//     res.json(updatedSaving);
//   } catch (error) {
//     console.error("Error updating saving:", error);
//     res.status(500).json({ error: "Server error." });
//   }
// });

// PUT: Update a saving by ID
// router.put("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { amount, date, today, time } = req.body;

//     if (!id || isNaN(amount) || !date || !today || !time) {
//       return res.status(400).json({ error: "Invalid input data." });
//     }

//     const formattedTime = convertTo12(time);

//     const updatedSaving = await Saving.findByIdAndUpdate(
//       id,
//       { amount, date, today, time: formattedTime },
//       { new: true }
//     );

//     if (!updatedSaving) {
//       return res.status(404).json({ error: "Saving not found." });
//     }

//     // Update currentAmount and totalAmount for all records
//     const allSavings = await Saving.find();
//     let runningTotal = 0;

//     for (const saving of allSavings) {
//       runningTotal += saving.amount;
//       await Saving.findByIdAndUpdate(saving._id, {
//         currentAmount: runningTotal - saving.amount,
//         totalAmount: runningTotal,
//       });
//     }

//     res.json(updatedSaving);
//   } catch (error) {
//     console.error("Error updating saving:", error);
//     res.status(500).json({ error: "Server error." });
//   }
// });


// PUT: Update a saving by ID
// router.put("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { amount, date, time } = req.body;

//     // Validate inputs
//     if (!id || isNaN(amount) || !date || !time) {
//       return res.status(400).json({ error: "Invalid input data." });
//     }

//     // Calculate 'today' based on the new date
//     const newToday = new Date(date).toLocaleDateString("en-US", { weekday: "long" });

//     // Convert time to 12-hour format before updating
//     const formattedTime = convertTo12(time);

//     // Find and update the saving entry
//     const updatedSaving = await Saving.findByIdAndUpdate(
//       id,
//       { amount, date, today: newToday, time: formattedTime }, // Automatically calculate 'Today'
//       { new: true } // Return the updated document
//     );

//     if (!updatedSaving) {
//       return res.status(404).json({ error: "Saving not found." });
//     }

//     console.log("Successfully updated saving:", updatedSaving);
//     res.json(updatedSaving);
//   } catch (error) {
//     console.error("Error updating saving:", error);
//     res.status(500).json({ error: "Server error." });
//   }
// });

// PUT: Update a saving by ID
// router.put("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { amount, date, time } = req.body;

//     // Validate inputs
//     if (!id || isNaN(amount) || !date || !time) {
//       return res.status(400).json({ error: "Invalid input data." });
//     }

//     // Dynamically calculate the 'Today' field based on the provided 'Date'
//     const newToday = new Date(date).toLocaleDateString("en-US", { weekday: "long" });

//     // Convert time to 12-hour format
//     const formattedTime = convertTo12(time);

//     // Find and update the saving entry
//     const updatedSaving = await Saving.findByIdAndUpdate(
//       id,
//       { amount, date, today: newToday, time: formattedTime },
//       { new: true } // Return the updated document
//     );

//     if (!updatedSaving) {
//       return res.status(404).json({ error: "Saving not found." });
//     }

//     console.log("Successfully updated saving:", updatedSaving);
//     res.json(updatedSaving);
//   } catch (error) {
//     console.error("Error updating saving:", error);
//     res.status(500).json({ error: "Server error." });
//   }
// });

// PUT: Update a saving by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, date, time } = req.body;

    if (!id || isNaN(amount) || !date || !time) {
      return res.status(400).json({ error: "Invalid input data." });
    }

    // Dynamically calculate 'Today' field based on the new date
    const newDate = new Date(date);
    const today = newDate.toLocaleDateString("en-US", { weekday: "long" });

    // Fetch all savings to recalculate currentAmount and totalAmount
    const savings = await Saving.find().sort({ date: 1, time: 1 }); // Sort by date and time

    let runningTotal = 0;
    let updatedSaving = null;

    // Iterate through savings to calculate running totals
    for (const saving of savings) {
      if (saving._id.toString() === id) {
        // Update the matched saving
        saving.amount = amount;
        saving.date = date;
        saving.today = today;
        saving.time = convertTo12(time);
        saving.currentAmount = runningTotal; // Update currentAmount
        saving.totalAmount = runningTotal + amount; // Update totalAmount
        updatedSaving = saving;
      } else {
        // Recalculate totals for other records
        saving.currentAmount = runningTotal;
        saving.totalAmount = runningTotal + saving.amount;
      }
      runningTotal += saving.amount; // Update the running total
      await saving.save(); // Save each record
    }

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


