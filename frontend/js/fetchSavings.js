// import moment from 'moment';
import convertTo12 from './convertTime.js';

const fetchSavings = async () => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    tableBodyEl.innerHTML = "";

    let runningTotal = 0;
    // console.log("Processing savings tessssting data...");

    data.forEach((saving) => {
      // console.log(`Processing saving tessssting ID ${saving._id}, time: ${saving.time}`);
      runningTotal += saving.amount;

      console.log(`Original time: ${saving.time}`);
      const formattedTime = convertTo12(saving.time); // Correctly convert time
      console.log(`Formatted time: ${formattedTime}`);

      const row = `
        <tr>
          <td>${saving.amount}</td>
          <td>${runningTotal - saving.amount}</td>
          <td>${runningTotal}</td>
          <td>${saving.date}</td>
          <td>${saving.today}</td>
          <td>${formattedTime}</td> <!-- Ensure this is used -->
          <td>
            <button class="edit-btn" 
                    data-id="${saving._id}" 
                    data-amount="${saving.amount}" 
                    data-date="${saving.date}" 
                    data-today="${saving.today}" 
                    data-time="${saving.time}">Edit</button>
            <button class="delete-btn" data-id="${saving._id}">Delete</button>
          </td>
        </tr>
      `;
      console.log(`Row for saving to tessssst the formatting time ID ${saving._id}:`, row); // Log the full row
      tableBodyEl.innerHTML = ""; // Clear the table first
      tableBodyEl.innerHTML += row; // Add the updated row

      // tableBodyEl.innerHTML += row;
    });

    totalAmountEl.textContent = `Total Amount: ${runningTotal}`;

    attachDeleteListeners();
    attachEditListeners();
  } catch (error) {
    console.error("Error fetching savings:", error);
    alert("Failed to fetch savings.");
  }
};




