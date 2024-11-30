// Elements
const tableBodyEl = document.getElementById('table-body');
const totalAmountEl = document.getElementById('total-amount');
const amountInputEl = document.getElementById('amount');
const addAmountBtn = document.getElementById('add-amount-btn');

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
        </tr>
      `;
      tableBodyEl.innerHTML += row;
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

  // Send POST request to backend
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });

    if (response.status === 201) {
      // Successfully added amount, reload savings data
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

// Event listener for the Add Amount button
addAmountBtn.addEventListener('click', addAmount);

// Initial fetch on page load
fetchSavings();

