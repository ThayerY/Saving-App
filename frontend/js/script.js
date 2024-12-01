
import { fetchSavings } from './fetchSavings.js';
import { addAmount } from './addAmount.js';
import { subtractAmount } from './subtractAmount.js';
import { deleteSaving } from './deleteSaving.js';

// Elements
const tableBodyEl = document.getElementById('table-body');
const totalAmountEl = document.getElementById('total-amount');
const amountInputEl = document.getElementById('amount');
const addAmountBtn = document.getElementById('add-amount-btn');
const subtractAmountBtn = document.getElementById('subtract-amount-btn');

// API URL
const apiUrl = "http://localhost:5000/api/savings";

// Function to attach delete event listeners
const attachDeleteListeners = () => {
  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', () =>
      deleteSaving(button.dataset.id, apiUrl, fetchSavings, tableBodyEl, totalAmountEl, attachDeleteListeners)
    );
  });
};

// Add event listeners for buttons
addAmountBtn.addEventListener('click', () =>
  addAmount(apiUrl, fetchSavings, amountInputEl, tableBodyEl, totalAmountEl, attachDeleteListeners)
);

subtractAmountBtn.addEventListener('click', () =>
  subtractAmount(apiUrl, fetchSavings, amountInputEl, tableBodyEl, totalAmountEl, attachDeleteListeners)
);

// Initial fetch on page load
fetchSavings(apiUrl, tableBodyEl, totalAmountEl, attachDeleteListeners);
