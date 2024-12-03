// this one is working
const apiUrl = "http://localhost:5000/api/savings";

// Elements
const tableBodyEl = document.getElementById('table-body');
const totalAmountEl = document.getElementById('total-amount');
const amountInputEl = document.getElementById('amount');
const addAmountBtn = document.getElementById('add-amount-btn');
const subtractAmountBtn = document.getElementById('subtract-amount-btn');

// Fetch and Display Savings
const fetchSavings = async () => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    // console.log("Fetched savings data:", data);

    // Clear the table
    tableBodyEl.innerHTML = '';

    // Populate the table
    let runningTotal = 0;
    data.forEach((saving) => {
      runningTotal += saving.amount;
      // Debug: Log the original time value to verify its format
      // console.log(`Original time from saving: ${saving.time}`);

      // Parse and format the time using Moment.js
      const formattedTime = moment(saving.time, "HH:mm:ss").format("h:mm A");

      const row = `
        <tr>
          <td>${saving.amount}</td>
          <td>${runningTotal - saving.amount}</td>
          <td>${runningTotal}</td>
          <td>${saving.date}</td>
          <td>${new Date(saving.date).toLocaleDateString("en-US", { weekday: "long" })}</td>
          <td>${formattedTime}</td>
          <td>
            <button class="edit-btn" data-id="${saving._id}" data-amount="${saving.amount}">Edit</button>
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
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });

    if (response.ok) {
      fetchSavings();
      amountInputEl.value = ''; // Clear the input
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
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: -amount }), // Negative for subtraction
    });

    if (response.ok) {
      fetchSavings();
      amountInputEl.value = ''; // Clear the input
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
  const editButtons = document.querySelectorAll('.edit-btn');
  // console.log(`Attaching edit listeners to ${editButtons.length} buttons.`);
  editButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.dataset.id;
      const currentAmount = button.dataset.amount;
      // console.log(`Edit button clicked for ID: ${id} with amount: ${currentAmount}`);
      editSaving(id, currentAmount); // Call the edit functionality
    });
  });
};

// Delete Saving
const attachDeleteListeners = () => {
  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const id = button.dataset.id;
      try {
        const response = await fetch(`${apiUrl}/${id}`, {
          method: 'DELETE',
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

// Edit Saving
const editSaving = async (id, currentAmount) => {
  const newAmount = parseFloat(prompt(`Edit amount (current: ${currentAmount}):`, currentAmount));

  if (isNaN(newAmount) || newAmount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: newAmount }),
    });

    if (response.ok) {
      console.log(`Saving updated successfully with ID: ${id}`);
      fetchSavings(); // Refresh the table
    } else {
      alert("Failed to update the entry.");
    }
  } catch (error) {
    console.error("Error updating entry:", error);
    alert("Error updating entry.");
  }
};

// console.log("Testing Moment.js:", moment().format("YYYY-MM-DD HH:mm:ss"));

// Event Listeners
addAmountBtn.addEventListener('click', addAmount);
subtractAmountBtn.addEventListener('click', subtractAmount);

// Initial Fetch
fetchSavings();
