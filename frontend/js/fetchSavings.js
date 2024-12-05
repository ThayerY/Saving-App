import convertTo12 from './convertTime.js';

const fetchSavings = async () => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    tableBodyEl.innerHTML = "";

    let runningTotal = 0;
    // console.log("Processing savings tessssting data...");

    // data.forEach((saving) => {
    //   // console.log(`Processing saving tessssting ID ${saving._id}, time: ${saving.time}`);
    //   runningTotal += saving.amount;

    //   console.log(`Original time: ${saving.time}`);
    //   const formattedTime = convertTo12(saving.time); // Correctly convert time
    //   console.log(`Formatted time: ${formattedTime}`);

    //   const row = `
    //     <tr>
    //       <td>${saving.amount}</td>
    //       <td>${runningTotal - saving.amount}</td>
    //       <td>${runningTotal}</td>
    //       <td>${saving.date}</td>
    //       <td>${saving.today}</td>
    //       <td>${formattedTime}</td> <!-- Ensure this is used -->
    //       <td>
    //         <button class="edit-btn"
    //                 data-id="${saving._id}"
    //                 data-amount="${saving.amount}"
    //                 data-date="${saving.date}"
    //                 data-today="${saving.today}"
    //                 data-time="${saving.time}">Edit</button>
    //         <button class="delete-btn" data-id="${saving._id}">Delete</button>
    //       </td>
    //     </tr>
    //   `;
    //   console.log(`Row for saving to tessssst the formatting time ID ${saving._id}:`, row); // Log the full row
    //   tableBodyEl.innerHTML = ""; // Clear the table first
    //   tableBodyEl.innerHTML += row; // Add the updated row

    //   // tableBodyEl.innerHTML += row;
    // });




    data.forEach((saving) => {
      // Parse and format the time using the same convertTo12 logic
      const formattedTime = convertTo12(saving.time);
      const row = `
        <tr>
          <td>${saving.amount}</td>
          <td>${saving.currentAmount}</td>
          <td>${saving.totalAmount}</td>
          <td>${saving.date}</td>
          <td>${saving.today}</td>
          <td>${formattedTime}</td>
          <td>
            <button class="edit-btn" data-id="${saving._id}" data-amount="${saving.amount}" data-date="${saving.date}" data-today="${saving.today}" data-time="${saving.time}">Edit</button>
            <button class="delete-btn" data-id="${saving._id}">Delete</button>
          </td>
        </tr>
      `;
      tableBodyEl.innerHTML += row;
    });

    totalAmountEl.textContent = `Total Amount: ${runningTotal}`;

    attachDeleteListeners();
    attachEditListeners();
  } catch (error) {
    console.error("Error fetching savings:", error);
    alert("Failed to fetch savings.");
  }
};








// import convertTo12 from './convertTime.js';

// const fetchSavings = async (apiUrl, tableBodyEl, totalAmountEl, attachDeleteListeners, attachEditListeners) => {
//   try {
//     // Fetch data from the backend
//     const response = await fetch(apiUrl);
//     const data = await response.json();

//     // Clear the table before rendering
//     tableBodyEl.innerHTML = "";

//     // Initialize running total
//     let runningTotal = 0;

//     // Render each saving entry
//     data.forEach((saving) => {
//       runningTotal += saving.amount; // Calculate the running total

//       // Format the amounts with commas
//       const formattedAmount = saving.amount.toLocaleString();
//       const formattedCurrentAmount = (runningTotal - saving.amount).toLocaleString();
//       const formattedTotalAmount = runningTotal.toLocaleString();

//       // Format the time using the convertTo12 helper function
//       const formattedTime = convertTo12(saving.time);

//       // Create a table row
//       const row = `
//         <tr>
//           <td>${formattedAmount}</td>
//           <td>${formattedCurrentAmount}</td>
//           <td>${formattedTotalAmount}</td>
//           <td>${saving.date}</td>
//           <td>${saving.today}</td>
//           <td>${formattedTime}</td>
//           <td>
//             <button class="edit-btn" data-id="${saving._id}" data-amount="${saving.amount}" data-date="${saving.date}" data-today="${saving.today}" data-time="${saving.time}">Edit</button>
//             <button class="delete-btn" data-id="${saving._id}">Delete</button>
//           </td>
//         </tr>
//       `;

//       // Append the row to the table
//       tableBodyEl.innerHTML += row;
//     });

//     // Update the Total Amount field with formatted value
//     totalAmountEl.textContent = `Total Amount: ${runningTotal.toLocaleString()}`;

//     // Attach event listeners for edit and delete buttons
//     attachDeleteListeners();
//     attachEditListeners();
//   } catch (error) {
//     console.error("Error fetching savings:", error);
//     alert("Failed to fetch savings.");
//   }
// };

// export default fetchSavings;


















