// Edit a saving entry inline within the table
const editSavingInline = async (button) => {
  const id = button.dataset.id; // Get the saving ID
  const row = button.closest("tr"); // Get the row containing the button

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

  // Change the Edit button to a Save button
  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";
  saveBtn.className = "save-btn";
  button.replaceWith(saveBtn);

  // Add event listener to Save button
  saveBtn.addEventListener("click", async () => {
    const newAmount = parseFloat(amountInput.value);
    const newDate = dateInput.value;
    const newToday = todayInput.value;
    const newTime = timeInput.value;

    if (!newAmount || isNaN(newAmount) || !newDate || !newToday || !newTime) {
      alert("Please enter valid values for all fields.");
      return;
    }

    // Update the entry in the backend
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
          time: moment(newTime, "HH:mm").format("h:mm A"),
        }),
      });

      if (response.ok) {
        // Update the table with new values
        amountCell.textContent = newAmount;
        dateCell.textContent = newDate;
        todayCell.textContent = newToday;
        timeCell.textContent = moment(newTime, "HH:mm").format("h:mm A");
        saveBtn.replaceWith(button);
      } else {
        alert("Failed to update the entry.");
      }
    } catch (error) {
      console.error("Error updating entry:", error);
      alert("Error updating entry.");
    }
  });
};
