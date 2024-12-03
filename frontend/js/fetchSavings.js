// this one is working

import moment from 'moment';

const fetchSavings = async () => {
  try {
    console.log("Fetching savings...");
    const response = await fetch(apiUrl);
    console.log("Response:", response);
    const data = await response.json();
    console.log("Fetched data:", data);

    // Clear the table
    tableBodyEl.innerHTML = '';

    // Populate the table
    let runningTotal = 0;
    data.forEach((saving) => {
      runningTotal += saving.amount;

      // Format the time using Moment.js
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

    // Attach Delete and Edit Listeners
    attachDeleteListeners();
    attachEditListeners();
  } catch (error) {
    console.error("Error fetching savings:", error);
    alert("Failed to fetch savings.");
  }
};



//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------


