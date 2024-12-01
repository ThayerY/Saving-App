
export const addAmount = async (apiUrl, fetchSavings, amountInputEl, tableBodyEl, totalAmountEl, attachDeleteListeners) => {
  const amount = parseFloat(amountInputEl.value);

  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount!");
    return;
  }

  try {
    // Fetch the current total amount
    const response = await fetch(apiUrl);
    const data = await response.json();
    const currentTotal = data.reduce((sum, saving) => sum + saving.amount, 0);

    // Send POST request to add the new amount
    const postResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currentAmount: currentTotal,
        totalAmount: currentTotal + amount,
        date: new Date().toISOString().split("T")[0],
        today: new Date().toDateString(),
        time: new Date().toLocaleTimeString(),
      }),
    });

    if (postResponse.status === 201) {
      // Re-fetch the table to include the new entry
      await fetchSavings(apiUrl, tableBodyEl, totalAmountEl, attachDeleteListeners);
      amountInputEl.value = ''; // Clear the input field
    } else {
      alert("Failed to add amount.");
    }
  } catch (error) {
    console.error("Error in addAmount:", error);
    alert("Failed to fetch savings.");
  }
};
