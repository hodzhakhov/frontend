document.addEventListener("DOMContentLoaded", () => {
  const table = document.getElementById("cryptoTable");
  const addRowButton = document.getElementById("addRow");
  const saveTableButton = document.getElementById("saveTable");
  const loadTableButton = document.getElementById("loadTable");

  addRowButton.addEventListener("click", () => {
    const tbody = table.querySelector("tbody");
    const row = document.createElement("tr");

    const currencyCell = document.createElement("td");
    currencyCell.contentEditable = "true";
    currencyCell.textContent = "New Currency";

    const balanceCell = document.createElement("td");
    balanceCell.contentEditable = "true";
    balanceCell.textContent = "0.00";

    const notesCell = document.createElement("td");
    notesCell.contentEditable = "true";
    notesCell.textContent = "Add notes...";

    const deleteCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "deleteRow";
    deleteButton.addEventListener("click", () => {
      row.remove();
    });
    deleteCell.appendChild(deleteButton);

    row.appendChild(currencyCell);
    row.appendChild(balanceCell);
    row.appendChild(notesCell);
    row.appendChild(deleteCell);

    tbody.appendChild(row);
  });

  saveTableButton.addEventListener("click", () => {
    const rows = table.querySelectorAll("tbody tr");
    const data = [];

    rows.forEach((row) => {
      const cells = row.querySelectorAll("td");
      const rowData = {
        currency: cells[0].textContent.trim(),
        balance: cells[1].textContent.trim(),
        notes: cells[2].textContent.trim(),
      };
      data.push(rowData);
    });

    localStorage.setItem("cryptoTableData", JSON.stringify(data));
  });

  loadTableButton.addEventListener("click", () => {
    const tbody = table.querySelector("tbody");
    tbody.innerHTML = "";

    const data = JSON.parse(localStorage.getItem("cryptoTableData")) || [];

    data.forEach((rowData) => {
      const row = document.createElement("tr");

      const currencyCell = document.createElement("td");
      currencyCell.contentEditable = "true";
      currencyCell.textContent = rowData.currency;

      const balanceCell = document.createElement("td");
      balanceCell.contentEditable = "true";
      balanceCell.textContent = rowData.balance;

      const notesCell = document.createElement("td");
      notesCell.contentEditable = "true";
      notesCell.textContent = rowData.notes;

      const deleteCell = document.createElement("td");
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.className = "deleteRow";
      deleteButton.addEventListener("click", () => {
        row.remove();
      });
      deleteCell.appendChild(deleteButton);

      row.appendChild(currencyCell);
      row.appendChild(balanceCell);
      row.appendChild(notesCell);
      row.appendChild(deleteCell);

      tbody.appendChild(row);
    });
  });
});

window.addEventListener("load", function () {
  let backBtn = Telegram.WebApp.BackButton;
  backBtn.show();

  const goBack = () => {
    window.location.href = "index.html";
    backBtn.hide();
  };

  backBtn.onClick(goBack);
});
