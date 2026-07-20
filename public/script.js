const form = document.getElementById('expense-form');
const nameInput = document.getElementById('expense-name');
const amountInput = document.getElementById('expense-amount');
const list = document.getElementById('expense-list');
const totalEl = document.getElementById('total-amount');
const clearBtn = document.getElementById('clear-btn');

let expenses = [];

function render() {
  list.innerHTML = '';
  let total = 0;

  expenses.forEach((expense, index) => {
    total += expense.amount;

    const li = document.createElement('li');
    li.innerHTML = `
      <span>${expense.name}</span>
      <span>
        $${expense.amount.toFixed(2)}
        <button class="remove-btn" data-index="${index}">✕</button>
      </span>
    `;
    list.appendChild(li);
  });

  totalEl.textContent = total.toFixed(2);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (!name || isNaN(amount) || amount < 0) return;

  expenses.push({ name, amount });
  nameInput.value = '';
  amountInput.value = '';
  nameInput.focus();

  render();
});

list.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-btn')) {
    const index = parseInt(e.target.dataset.index, 10);
    expenses.splice(index, 1);
    render();
  }
});

clearBtn.addEventListener('click', () => {
  expenses = [];
  render();
});
