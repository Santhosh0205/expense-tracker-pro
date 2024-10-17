document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById('login-form');
  const loginError = document.getElementById('login-error');

  loginForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent default form submission

      // Get the username and password values
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      // Check login credentials
      if (username === 'san' && password === '123') { 
          window.location.href = 'home.html'; // Redirect to home page on successful login
      } else if (username === 'suriya' && password === '123') { 
          window.location.href = 'home.html';
      } else if (username === 'vicky' && password === '123') {
          window.location.href = 'home.html';
      } else if (username === 'mani' && password === '123') { 
          window.location.href = 'home.html';
      } else {
          loginError.textContent = 'Invalid username or password';
      }
  });

});

document.addEventListener("DOMContentLoaded", () => {
  const groupExpenseForm = document.getElementById("group-expense-form");
  const privateExpenseForm = document.getElementById("private-expense-form");
  const expenseHistoryButton = document.getElementById("expense-history");
  const expenseHistoryContainer = document.getElementById("expense-history-container");

  // Function to save expenses to localStorage
  function saveExpense(type, expense) {
      let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
      expenses.push({ type, ...expense });
      localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  // Event listener for group expense form submission
  groupExpenseForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const groupName = document.getElementById("group-name").value;
      const groupAmount = document.getElementById("group-amount").value;
      const groupDescription = document.getElementById("group-description").value;

      const expense = {
          groupName,
          amount: groupAmount,
          description: groupDescription,
          date: new Date().toLocaleDateString(),
      };

      saveExpense("group", expense);
      alert("Group expense added successfully!");

      // Clear form
      groupExpenseForm.reset();
  });

  // Event listener for private expense form submission
  privateExpenseForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const privateAmount = document.getElementById("private-amount").value;
      const privateDescription = document.getElementById("private-description").value;

      const expense = {
          amount: privateAmount,
          description: privateDescription,
          date: new Date().toLocaleDateString(),
      };

      saveExpense("private", expense);
      alert("Private expense added successfully!");

      // Clear form
      privateExpenseForm.reset();
  });

  // Function to display expense history
  function displayExpenseHistory() {
      expenseHistoryContainer.innerHTML = ""; // Clear any previous data
      const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

      if (expenses.length === 0) {
          expenseHistoryContainer.innerHTML = "<p>No expenses recorded yet.</p>";
          return;
      }

      const historyList = document.createElement("ul");
      historyList.style.listStyleType = "none";
      historyList.style.padding = "0";

      expenses.forEach((expense) => {
          const listItem = document.createElement("li");
          listItem.style.borderBottom = "1px solid #ccc";
          listItem.style.padding = "10px";
          
          listItem.innerHTML = `
              <strong>${expense.type === "group" ? "Group Expense" : "Private Expense"}</strong><br>
              ${expense.groupName ? `<span>Group: ${expense.groupName}</span><br>` : ""}
              Amount: ${expense.amount}<br>
              Description: ${expense.description || "N/A"}<br>
              Date: ${expense.date}
          `;
          
          historyList.appendChild(listItem);
      });

      expenseHistoryContainer.appendChild(historyList);
  }

  // Event listener for expense history button click
  expenseHistoryButton.addEventListener("click", displayExpenseHistory);
});
