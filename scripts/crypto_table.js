document.addEventListener("DOMContentLoaded", () => {
    const table = document.getElementById("cryptoTable");
    const addRowButton = document.getElementById("addRow");
    const saveTableButton = document.getElementById("saveTable");
    const loadTableButton = document.getElementById("loadTable");

    addRowButton.addEventListener("click", () => {
        const tbody = table.querySelector("tbody");
        const row = document.createElement("tr");

        row.innerHTML = `
            <td contenteditable="true">New Currency</td>
            <td contenteditable="true">0.00</td>
            <td contenteditable="true">Add notes...</td>
            <td><button class="deleteRow">Delete</button></td>
        `;

        const deleteButton = row.querySelector(".deleteRow");
        deleteButton.addEventListener("click", () => {
            row.remove();
        });

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

            row.innerHTML = `
                <td contenteditable="true">${ rowData.currency }</td>
                <td contenteditable="true">${ rowData.balance }</td>
                <td contenteditable="true">${ rowData.notes }</td>
                <td><button class="deleteRow">Delete</button></td>
            `;

            const deleteButton = row.querySelector(".deleteRow");
            deleteButton.addEventListener("click", () => {
                row.remove();
            });

            tbody.appendChild(row);
        });
    });
});
