
export const fetchSavings = async (apiUrl, tableBodyEl, totalAmountEl, attachDeleteListeners) => {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Fetch failed with status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched savings data:", data);

    // Clear the table before populating
    tableBodyEl.innerHTML = '';

    let runningTotal = 0;

    // Insert each saving into the table
    data.forEach((saving) => {
      const currentAmount = runningTotal;
      runningTotal += saving.amount;

      const row = `
        <tr>
          <td>${saving.amount}</td>
          <td>${currentAmount}</td>
          <td>${runningTotal}</td>
          <td>${saving.date}</td>
          <td>${saving.today}</td>
          <td>${saving.time}</td>
          <td><button class="delete-btn" data-id="${saving._id}">Delete</button></td>
        </tr>
      `;
      tableBodyEl.innerHTML += row;
    });

    // Update total amount display
    totalAmountEl.textContent = `Total Amount: ${runningTotal}`;

    // Reattach event listeners for delete buttons
    if (typeof attachDeleteListeners === 'function') {
      attachDeleteListeners();
    } else {
      console.error("attachDeleteListeners is not a function");
    }
  } catch (error) {
    console.error("Error in fetchSavings:", error);
    alert("Failed to fetch savings.");
  }
};
