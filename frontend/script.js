// Elements
const tableBodyEl = document.getElementById('table-body');
const totalAmountEl = document.getElementById('total-amount');
const amountInputEl = document.getElementById('amount');
const addAmountBtn = document.getElementById('add-amount-btn');
const subtractAmountBtn = document.getElementById('subtract-amount-btn'); // Main subtract button

// API URL
const apiUrl = "http://localhost:5000/api/savings";

// Fetch and display savings data
const fetchSavings = async () => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Clear the table before populating
    tableBodyEl.innerHTML = '';

    // Insert each saving into the table
    data.forEach((saving) => {
      const row = `
        <tr>
          <td>${saving.amount}</td>
          <td>${saving.currentAmount}</td>
          <td>${saving.totalAmount}</td>
          <td>${saving.date}</td>
          <td>${saving.today}</td>
          <td>${saving.time}</td>
          <td><button class="delete-btn" data-id="${saving._id}">Delete</button></td>
        </tr>
      `;
      tableBodyEl.innerHTML += row;
    });

    // Add event listeners to delete buttons
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach((button) => {
      button.addEventListener('click', () => deleteSaving(button.dataset.id));
    });

    // Update total amount
    const totalAmount = data.reduce((sum, saving) => sum + saving.amount, 0);
    totalAmountEl.textContent = `Total Amount: ${totalAmount}`;
  } catch (error) {
    console.error("Error fetching savings:", error);
    alert("Failed to fetch savings.");
  }
};


// Add new amount to the backend and update UI
const addAmount = async () => {
  const amount = parseFloat(amountInputEl.value);

  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount!");
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

    if (response.status === 201) {
      fetchSavings();
      amountInputEl.value = ''; // Clear input field after adding amount
    } else {
      alert("Failed to add amount.");
    }
  } catch (error) {
    console.error("Error adding amount:", error);
    alert("Error adding amount.");
  }
};

// Subtract amount from the backend for a specific row
const subtractAmountForRow = async (id) => {
  const amount = parseFloat(amountInputEl.value);

  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount!");
    return;
  }

  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: -amount }),
    });

    if (response.status === 200) {
      fetchSavings();
      amountInputEl.value = ''; // Clear input field
    } else {
      alert("Failed to subtract amount.");
    }
  } catch (error) {
    console.error("Error subtracting amount:", error);
    alert("Error subtracting amount.");
  }
};

/* subtract an amount, a new row is added to the table with:
A negative value for the amount*/
const subtractAmount = async () => {
  const amount = parseFloat(amountInputEl.value);

  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount!");
    return;
  }

  try {
    // Create a new entry for the subtracted amount in the backend
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: -amount, // Save the subtracted amount as a negative value
        date: new Date().toISOString(), // Add timestamp
      }),
    });

    if (response.status === 201) {
      // Fetch and re-render the table after subtraction
      fetchSavings();
      amountInputEl.value = ''; // Clear input field
    } else {
      alert("Failed to subtract amount.");
    }
  } catch (error) {
    console.error("Error subtracting amount:", error);
    alert("Error subtracting amount.");
  }
};




// Delete saving from backend and update UI
const deleteSaving = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      fetchSavings();
    } else {
      alert("Failed to delete the entry.");
    }
  } catch (error) {
    console.error("Error deleting entry:", error);
    alert("Error deleting entry.");
  }
};

// Event listener for the Add Amount button
addAmountBtn.addEventListener('click', addAmount);

// Event listener for the Main Subtract Amount button
subtractAmountBtn.addEventListener('click', subtractAmount); // Use the correct button

// Initial fetch on page load
fetchSavings();
