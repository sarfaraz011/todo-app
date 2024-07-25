const listContainer = document.getElementById("list-container");
const Add_btn = document.querySelector('.Add-btn');
const input = document.querySelector('#input-box');

// Function to add item to the list
function addItem() {
    if (input.value.trim() !== "") {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.innerHTML=input.value;
        li.classList.add('li-list');
        li.appendChild(span);

        // Create a div to wrap the edit and delete buttons
        const div = document.createElement('div');
        div.classList.add('button-container');
        li.appendChild(div);

        // Create and append edit button
        const edit = document.createElement('button');
        edit.innerHTML = "\u270E"; // Unicode character for the pencil (edit) icon
        div.appendChild(edit);
        edit.classList.add('edit');

        // Create and append delete button
        const del = document.createElement('button');
        del.innerHTML = "\u00d7"; // Unicode character for the cross (delete) icon
        div.appendChild(del);
        del.classList.add('del');

        // Insert the new item at the top of the list
        listContainer.insertBefore(li, listContainer.firstChild);

        // Clear the input box
        input.value = "";

        saveData(); // Save the new data
    }
}

// Add item when button is clicked
Add_btn.addEventListener('click', addItem);

// Add item when Enter key is pressed in the input field
input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default behavior (e.g., form submission)
        addItem();
    }
});

// Function to save data in local storage
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

// Function to show tasks from local storage
function showTask() {
    const data = localStorage.getItem("data");
    if (data) {
        listContainer.innerHTML = data;
    }
}

// Event delegation
listContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('edit')) {
        const li = event.target.closest('li');
        const newValue = prompt("Edit item:", li.firstChild.nodeValue);
        if (newValue !== null) {
            li.firstChild.nodeValue = newValue;
            saveData(); // Save the updated data
        }
    } else if (event.target.classList.contains('del')) {
        const li = event.target.closest('li');
        listContainer.removeChild(li);
        saveData(); // Save the updated data
    }
});

showTask();
