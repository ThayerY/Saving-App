
export const deleteSaving = async (id, apiUrl, fetchSavings, tableBodyEl, totalAmountEl, attachDeleteListeners) => {
  if (!id) {
    console.error("No ID provided for deletion.");
    return;
  }

  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      console.log(`Successfully deleted saving with ID: ${id}`);
      fetchSavings(apiUrl, tableBodyEl, totalAmountEl, attachDeleteListeners); // Re-fetch and reattach listeners
    } else {
      console.error(`Failed to delete saving with ID: ${id}`);
      alert("Failed to delete the entry.");
    }
  } catch (error) {
    console.error("Error deleting entry:", error);
    alert("Error deleting entry.");
  }
};
