// export const editSaving = async (id, currentAmount, apiUrl, fetchSavings, tableBodyEl, totalAmountEl, attachDeleteListeners, attachEditListeners) => {
//   const newAmount = parseFloat(prompt(`Edit amount (current: ${currentAmount}):`, currentAmount));

//   if (isNaN(newAmount) || newAmount <= 0) {
//     alert("Please enter a valid amount!");
//     return;
//   }

//   try {
//     const response = await fetch(`${apiUrl}/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ amount: newAmount }),
//     });

//     if (response.ok) {
//       console.log(`Successfully updated saving with ID: ${id}`);
//       fetchSavings(apiUrl, tableBodyEl, totalAmountEl, attachDeleteListeners, attachEditListeners);
//     } else {
//       alert("Failed to update the entry.");
//     }
//   } catch (error) {
//     console.error("Error updating entry:", error);
//     alert("Error updating entry.");
//   }
// };



//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------






// export const editSaving = async (id, currentAmount, apiUrl, fetchSavings, tableBodyEl, totalAmountEl, attachDeleteListeners, attachEditListeners) => {
//   const newAmount = parseFloat(prompt(`Edit amount (current: ${currentAmount}):`, currentAmount));

//   if (isNaN(newAmount) || newAmount <= 0) {
//     alert("Please enter a valid amount!");
//     return;
//   }

//   try {
//     const url = `${apiUrl}/${id}`;
//     console.log(`Updating saving at URL: ${url}`);

//     const response = await fetch(url, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ amount: newAmount }),
//     });

//     if (!response.ok) {
//       console.error(`Failed to update saving: ${response.status} ${response.statusText}`);
//       alert("Failed to update the entry.");
//       return;
//     }

//     console.log(`Successfully updated saving with ID: ${id}`);
//     fetchSavings(apiUrl, tableBodyEl, totalAmountEl, attachDeleteListeners, attachEditListeners);
//   } catch (error) {
//     console.error("Error updating entry:", error);
//     alert("Error updating entry.");
//   }
// };



//-------------------------------------------------------------------------------
//--------------------------------------------------------------------------------


// export const editSaving = async (id, currentAmount, apiUrl, fetchSavings, tableBodyEl, totalAmountEl, attachDeleteListeners, attachEditListeners) => {
//   console.log(`editSaving called for ID: ${id}, current amount: ${currentAmount}`); // Debugging line

//   const newAmount = parseFloat(prompt(`Edit amount (current: ${currentAmount}):`, currentAmount));
//   console.log(`New amount entered: ${newAmount}`); // Debugging line

//   if (isNaN(newAmount) || newAmount <= 0) {
//     alert("Please enter a valid amount!");
//     return;
//   }

//   try {
//     const url = `${apiUrl}/${id}`;
//     console.log(`Sending PUT request to URL: ${url} with new amount: ${newAmount}`); // Debugging line

//     const response = await fetch(url, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ amount: newAmount }),
//     });

//     if (!response.ok) {
//       console.error(`Failed to update saving: ${response.status} ${response.statusText}`);
//       alert("Failed to update the entry.");
//       return;
//     }

//     console.log(`Successfully updated saving with ID: ${id}`); // Debugging line
//     fetchSavings(apiUrl, tableBodyEl, totalAmountEl, attachDeleteListeners, attachEditListeners);
//   } catch (error) {
//     console.error("Error updating entry:", error);
//     alert("Error updating entry.");
//   }
// };


//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------





// export const editSaving = async (id, currentAmount, apiUrl, fetchSavings, tableBodyEl, totalAmountEl, attachDeleteListeners, attachEditListeners) => {
//   console.log(`editSaving called with ID: "${id}" and current amount: ${currentAmount}`); // Debugging line

//   const newAmount = parseFloat(prompt(`Edit amount (current: ${currentAmount}):`, currentAmount));
//   console.log(`New amount entered: ${newAmount}`); // Debugging line

//   if (isNaN(newAmount) || newAmount <= 0) {
//     alert("Please enter a valid amount!");
//     return;
//   }

//   try {
//     const url = `${apiUrl}/${id}`;
//     console.log(`Sending PUT request to URL: "${url}" with new amount: ${newAmount}`); // Debugging line

//     const response = await fetch(url, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ amount: newAmount }),
//     });

//     if (!response.ok) {
//       console.error(`Failed to update saving: ${response.status} ${response.statusText}`);
//       alert("Failed to update the entry.");
//       return;
//     }

//     console.log(`Successfully updated saving with ID: ${id}`);
//     fetchSavings(apiUrl, tableBodyEl, totalAmountEl, attachDeleteListeners, attachEditListeners);
//   } catch (error) {
//     console.error("Error updating entry:", error);
//     alert("Error updating entry.");
//   }
// };




//-------------------------------------------------------------------------------
//--------------------------------------------------------------------------------


export const editSaving = async (id, currentAmount, apiUrl, fetchSavings, tableBodyEl, totalAmountEl, attachDeleteListeners, attachEditListeners) => {
  console.log(`editSaving called with ID: "${id}" and current amount: ${currentAmount}`);

  const newAmount = parseFloat(prompt(`Edit amount (current: ${currentAmount}):`, currentAmount));
  console.log(`New amount entered: ${newAmount}`);

  if (isNaN(newAmount) || newAmount <= 0) {
    alert("Please enter a valid amount!");
    return;
  }

  try {
    const url = `${apiUrl}/${id}`;
    console.log(`Sending PUT request to URL: "${url}" with new amount: ${newAmount}`);

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: newAmount }),
    });

    if (!response.ok) {
      console.error(`Failed to update saving: ${response.status} ${response.statusText}`);
      alert("Failed to update the entry.");
      return;
    }

    console.log(`Successfully updated saving with ID: ${id}`);
    // Re-fetch and re-render the table
    fetchSavings(apiUrl, tableBodyEl, totalAmountEl, attachDeleteListeners, attachEditListeners);
  } catch (error) {
    console.error("Error updating entry:", error);
    alert("Error updating entry.");
  }
};





// export const editSaving = async (id, amount) => {
//   console.log(`editSaving called for ID: ${id} with amount: ${amount}`);
//   alert(`Editing ID: ${id} with amount: ${amount}`); // Temporary for testing
// };
