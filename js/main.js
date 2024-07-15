let searchName = document.getElementById("searchByname");
let searchAmount = document.getElementById("searchByAmount");
let customerTableBody = document.querySelector("#table tbody");
let customers = [];
let transactions = [];

async function fetchData() {
  let response = await fetch("js/api.json");
  let data = await response.json();
  customers = data.customers;
  transactions = data.transactions;
  document.getElementById("cus").innerHTML = customers.length;
  document.getElementById("tra").innerHTML = transactions.length;
  displayData(customers, transactions);
}

function displayData(customers, transactions) {
  customerTableBody.innerHTML = "";
  transactions.forEach((transaction) => {
    let customer = customers.find((el) => el.id === transaction.customer_id);
    if (customer) {
      let row = document.createElement("tr");
      row.innerHTML = `
              
                  <td>${customer.id}</td>
                  <td>${customer.name}</td>
                  <td>${transaction.id}</td>
                  <td>${transaction.date}</td>
                  <td>${transaction.amount}</td>
              `;
      customerTableBody.appendChild(row);
    }
  });
}

searchName.addEventListener("input", function () {
  let searchText = searchName.value.toLowerCase();
  let filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchText)
  );
  let filteredTransactions = transactions.filter((transaction) =>
    filteredCustomers.some(
      (customer) => customer.id === transaction.customer_id
    )
  );
  displayData(filteredCustomers, filteredTransactions);
});

searchAmount.addEventListener("input", function () {
  let minAmount = parseFloat(searchAmount.value);
  let filteredTransactions = transactions.filter(
    (transaction) => transaction.amount >= minAmount
  );
  let filteredCustomers = customers.filter((customer) =>
    filteredTransactions.some(
      (transaction) => transaction.customer_id === customer.id
    )
  );
  displayData(filteredCustomers, filteredTransactions);
});

fetchData();
