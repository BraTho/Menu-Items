let addOrUpdate = ""; 
window.onload = function () {
    document.querySelector("#menuItems")
    document.addEventListener("click", handleTableClick);

    document.querySelector("#addBtn").addEventListener("click", doAdd);
    document.querySelector("#updateBtn").addEventListener("click", doUpdate);
    document.querySelector("#deleteBtn").addEventListener("click", doDelete);
    document.querySelector("#doneBtn").addEventListener("click", doDone);
    document.querySelector("#cancelBtn").addEventListener("click", doCancel);

    refreshTable();
    setPanelState(false); 
    setBtnStates(false); 
};

function doAdd() {
    clearPanel();
    setPanelState(true);
    setIdState(true);
    addOrUpdate = "ADD";
}

function doUpdate() {
    setPanelState(true);
    setIdState(false);
    addOrUpdate = "UPDATE";
}

function doDone() {
    let id = Number(document.querySelector("#idInput").value);
    let category = document.querySelector("#categoryInput").value.trim();
    let description = document.querySelector("#descriptionInput").value.trim();
    let price = Number(document.querySelector("#priceInput").value);
    let veg = document.querySelector("#vegInput").checked; 

    if (!id || !category || !description || !price) {
        alert("Please fill in all fields correctly.");
        return;
    }

    let obj = {
        id: id,
        category: category,
        description: description,
        price: price,
        vegetarian: veg, 
    };

    let url = "http://localhost:8000/api/menuitems/" + id;
    let method = addOrUpdate === "ADD" ? "POST" : "PUT";

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            let response;
            try {
                response = JSON.parse(xhr.responseText);
            } catch (e) {
                alert("Error parsing server response: " + e.message);
                return;
            }

            console.log("Response received:", response);

            if (addOrUpdate === "ADD") {
                if (xhr.status === 201) {
                    if (response.data) {
                        alert("Add successful");
                    } else {
                        alert("Add failed: " + (response.err || "Unknown error"));
                    }
                    refreshTable();
                } else if (xhr.status === 409) {
                    alert("Cannot add because the ID is already in use.");
                } else {
                    alert("Error adding item: " + (response.err || `HTTP status ${xhr.status}`));
                }
            } else {
                if (xhr.status === 200) {
                    if (response.data) {
                        alert("Update successful");
                    } else {
                        alert("Update failed: " + (response.err || "Unknown error"));
                    }
                    refreshTable();
                } else if (xhr.status === 404) {
                    alert("Cannot update because the item was not found.");
                } else {
                    alert("Error updating item: " + (response.err || `HTTP status ${xhr.status}`));
                }
            }
        }
    };

    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(obj));
    setPanelState(false);
}

function doDelete() {
    let id = Number(
        document.querySelector(".selected").querySelector("td").innerHTML
    );
    let url = "http://localhost:8000/api/menuitems/" + id;
    let method = "DELETE";

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let resp = JSON.parse(xhr.responseText);
                if (resp.data) {
                    alert("delete successful");
                } else {
                    alert(xhr.responseText);
                }
                refreshTable();

            }
        }
    };
    xhr.open(method, url, true);
    xhr.send(); 
}


function doCancel() {
    setPanelState(false);
}

function buildTable(data) {
    let elem = document.querySelector("#menuItems");
    let html = "<table>";
    html +=
        "<tr><th>ID</th><th>Category</th><th>Description</th><th>Price</th><th>Vegetarian</th></tr>";
    data.forEach((item) => {
        html += "<tr>";
        html += `<td>${item.id}</td>`;
        html += `<td>${item.category}</td>`;
        html += `<td>${item.description}</td>`;
        html += `<td>${item.price}</td>`;
        html += `<td>${item.vegetarian}</td>`;
        html += "</tr>";
    });
    html += "</table>";
    elem.innerHTML = html;
}

function refreshTable() {
    let url = "http://localhost:8000/api/menuItems";
    let method = "GET";
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            let response = JSON.parse(xhr.responseText);
            if (xhr.status === 200) {
                buildTable(response.data);
                setBtnStates(false);
            } else {
                alert(response.err);
            }
        }
    };
    xhr.open(method, url, true);
    xhr.send();
}

function handleTableClick(evt) {
    let elem = evt.target;
    if (elem.nodeName !== "TD") return;
    clearSelections();
    let row = elem.parentElement;
    row.classList.add("selected");
    populatePanel();
    setBtnStates(true);
}

function populatePanel() {
    let row = document.querySelector(".selected");
    let temp = row.querySelectorAll("td");
    let id = Number(temp[0].innerHTML);
    let category = temp[1].innerHTML;
    let description = temp[2].innerHTML;
    let price = Number(temp[3].innerHTML);
    let veg = temp[4].innerHTML;
    document.querySelector("#idInput").value = id;
    document.querySelector("#categoryInput").value = category;
    document.querySelector("#descriptionInput").value = description;
    document.querySelector("#priceInput").value = price;
    document.querySelector("#vegInput").value = veg;
}

function clearPanel() {
    document.querySelector("#idInput").value = 0;
    document.querySelector("#categoryInput").value = "";
    document.querySelector("#descriptionInput").value = "";
    document.querySelector("#priceInput").value = 0;
    document.querySelector("#vegInput").value = "";
}

function clearSelections() {
    let rows = document.querySelectorAll("tr");
    for (let i = 0; i < rows.length; i++) {
        rows[i].classList.remove("selected");
    }
}

function setBtnStates(value) {
    let deleteBtn = document.querySelector("#deleteBtn");
    let updateBtn = document.querySelector("#updateBtn");
    if (value) {
        updateBtn.removeAttribute("disabled");
        deleteBtn.removeAttribute("disabled");
    } else {
        updateBtn.setAttribute("disabled", "disabled");
        deleteBtn.setAttribute("disabled", "disabled");
    }
}

function setPanelState(value) {
    let elem = document.querySelector("#inputPanel");
    if (value) {
        elem.classList.remove("hidden");
    } else {
        elem.classList.add("hidden");
    }
}

function setIdState(value) {
    let elem = document.querySelector("#idInput");
    if (value) {
        elem.removeAttribute("disabled");
    } else {
        elem.setAttribute("disabled", "disabled");
    }
}