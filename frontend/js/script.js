import convertTo12 from './convertTime.js';


const apiUrl = "http://localhost:5000/api/savings";

// Elements
const tableBodyEl = document.getElementById("table-body");
const totalAmountEl = document.getElementById("total-amount");
const amountInputEl = document.getElementById("amount");
const addAmountBtn = document.getElementById("add-amount-btn");
const subtractAmountBtn = document.getElementById("subtract-amount-btn");

// Fetch and Display Savings
const fetchSavings = async () => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log("Fetched savings data:", data);

    // Clear the table
    tableBodyEl.innerHTML = "";

    // Populate the table
    let runningTotal = 0;
    data.forEach((saving) => {
      runningTotal += saving.amount;

      const formattedTime = convertTo12(saving.time); // Correctly convert time

      const row = `
        <tr>
          <td>${saving.amount}</td>
          <td>${runningTotal - saving.amount}</td>
          <td>${runningTotal}</td>
          <td>${saving.date}</td>
          <td>${new Date(saving.date).toLocaleDateString("en-US", { weekday: "long" })}</td>
          <td>${formattedTime}</td>
          <td>
            <button class="edit-btn" 
                    data-id="${saving._id}" 
                    data-amount="${saving.amount}" 
                    data-date="${saving.date}" 
                    data-today="${new Date(saving.date).toLocaleDateString("en-US", { weekday: "long" })}" 
                    data-time="${saving.time}">Edit</button>
            <button class="delete-btn" data-id="${saving._id}">Delete</button>
          </td>
        </tr>
      `;
      tableBodyEl.innerHTML += row;
    });

    // Update Total Amount
    totalAmountEl.textContent = `Total Amount: ${runningTotal}`;

    // Attach Event Listeners
    attachDeleteListeners();
    attachEditListeners();
  } catch (error) {
    console.error("Error fetching savings:", error);
    alert("Failed to fetch savings.");
  }
};

// Add New Amount
const addAmount = async () => {
  const amount = parseFloat(amountInputEl.value);
  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    });

    if (response.ok) {
      fetchSavings();
      amountInputEl.value = ""; // Clear the input
    } else {
      alert("Failed to add amount.");
    }
  } catch (error) {
    console.error("Error adding amount:", error);
    alert("Error adding amount.");
  }
};

// Subtract Amount
const subtractAmount = async () => {
  const amount = parseFloat(amountInputEl.value);
  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: -amount }), // Negative for subtraction
    });

    if (response.ok) {
      fetchSavings();
      amountInputEl.value = ""; // Clear the input
    } else {
      alert("Failed to subtract amount.");
    }
  } catch (error) {
    console.error("Error subtracting amount:", error);
    alert("Error subtracting amount.");
  }
};

// Attach Edit Event Listeners
const attachEditListeners = () => {
  const editButtons = document.querySelectorAll(".edit-btn");
  editButtons.forEach((button) => {
    button.addEventListener("click", () => {
      editSavingInline(button); // Pass the button element to inline edit
    });
  });
};

// Edit Saving Inline
const editSavingInline = (button) => {
  const id = button.dataset.id;
  const row = button.closest("tr");

  // Get current values from the row
  const amountCell = row.children[0];
  const dateCell = row.children[3];
  const todayCell = row.children[4];
  const timeCell = row.children[5];

  // Create input fields for editing
  const amountInput = document.createElement("input");
  amountInput.type = "number";
  amountInput.value = amountCell.textContent.trim();
  amountInput.className = "edit-input";

  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.value = dateCell.textContent.trim();
  dateInput.className = "edit-date-input";

  const todayInput = document.createElement("input");
  todayInput.type = "text";
  todayInput.value = todayCell.textContent.trim();
  todayInput.className = "edit-today-input";

  const timeInput = document.createElement("input");
  timeInput.type = "time";
  timeInput.value = moment(timeCell.textContent.trim(), "h:mm A").format("HH:mm");
  timeInput.className = "edit-time-input";

  // Replace cell content with input fields
  amountCell.innerHTML = "";
  dateCell.innerHTML = "";
  todayCell.innerHTML = "";
  timeCell.innerHTML = "";

  amountCell.appendChild(amountInput);
  dateCell.appendChild(dateInput);
  todayCell.appendChild(todayInput);
  timeCell.appendChild(timeInput);

  // Change Edit button to Save button
  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";
  saveBtn.className = "save-btn";
  button.replaceWith(saveBtn);

  // Save changes
  saveBtn.addEventListener("click", async () => {
    const newAmount = parseFloat(amountInput.value);
    const newDate = dateInput.value;
    const newToday = todayInput.value;
    const newTime = timeInput.value;

    if (!newAmount || isNaN(newAmount) || !newDate || !newToday || !newTime) {
      alert("Please enter valid values for all fields.");
      return;
    }

    // Ensure time is sent in 12-hour format
    const formattedTime = moment(newTime, "HH:mm").format("h:mm A");

    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: newAmount,
          date: newDate,
          today: newToday,
          time: formattedTime,
        }),
      });

      if (response.ok) {
        fetchSavings(); // Refresh the table after saving
      } else {
        alert("Failed to update the entry.");
      }
    } catch (error) {
      console.error("Error updating entry:", error);
      alert("Error updating entry.");
    }
  });


};

// Attach Delete Event Listeners
const attachDeleteListeners = () => {
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const id = button.dataset.id;
      try {
        const response = await fetch(`${apiUrl}/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          fetchSavings();
        } else {
          alert("Failed to delete entry.");
        }
      } catch (error) {
        console.error("Error deleting entry:", error);
        alert("Error deleting entry.");
      }
    });
  });
};

// Event Listeners
addAmountBtn.addEventListener("click", addAmount);
subtractAmountBtn.addEventListener("click", subtractAmount);

// Initial Fetch
fetchSavings();
