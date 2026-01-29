let myLeads = [];
let editingIndex = null;
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
const noteEl = document.getElementById("note-el");
const noteBtn = document.getElementById("note-btn");
const editModal = document.getElementById("edit-modal");
const editUrlInput = document.getElementById("edit-url");
const editNoteInput = document.getElementById("edit-note");
const saveEditBtn = document.getElementById("save-edit-btn");
const cancelEditBtn = document.getElementById("cancel-edit-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

// Cross-browser API handler
const browserAPI =
    typeof chrome !== "undefined"
        ? chrome
        : typeof browser !== "undefined"
          ? browser
          : null;

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

tabBtn.addEventListener("click", function () {
    if (!browserAPI) {
        alert("Extension API not available. Please enter URL manually.");
        return;
    }

    // Works with Chrome, Edge, and Firefox
    browserAPI.tabs.query(
        { active: true, currentWindow: true },
        function (tabs) {
            if (tabs && tabs[0]) {
                const note = noteEl.value;
                myLeads.push({
                    url: tabs[0].url,
                    notes: note,
                });
                noteEl.value = "";
                localStorage.setItem("myLeads", JSON.stringify(myLeads));
                render(myLeads);
            }
        },
    );
});

noteBtn.addEventListener("click", function () {
    if (noteEl.value.trim()) {
        myLeads.push({
            url: "",
            notes: noteEl.value,
        });
        noteEl.value = "";
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    }
});

function render(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        const lead = leads[i];
        const url = typeof lead === "string" ? lead : lead.url || "";
        const notes = typeof lead === "string" ? "" : lead.notes || "";

        listItems += `
            <li class="lead-item">
                <div class="lead-content" data-index="${i}">
        `;

        if (url) {
            listItems += `
                    <a target='_blank' href='${url}' class="lead-url">
                        ${url}
                    </a>
            `;
        }

        if (notes) {
            listItems += `
                    <p class="lead-note">${notes}</p>
            `;
        }

        if (!url && !notes) {
            listItems += `<p class="empty-lead">Empty item</p>`;
        }

        listItems += `
                </div>
                <div class="lead-actions">
                    <button class="edit-btn" data-index="${i}"><img src="./edit-text.png" alt="Edit" class="icon"/></button>
                    <button class="delete-btn" data-index="${i}"><img src="./clear.png" alt="Delete" class="icon"/></button>
                </div>
            </li>
        `;
    }
    ulEl.innerHTML = listItems;

    // Add edit event listeners
    const editButtons = document.querySelectorAll(".edit-btn");
    editButtons.forEach((btn) => {
        btn.addEventListener("click", function () {
            const index = parseInt(this.getAttribute("data-index"));
            openEditModal(index);
        });
    });

    // Add delete event listeners for individual leads
    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach((btn) => {
        btn.addEventListener("click", function () {
            myLeads.splice(this.getAttribute("data-index"), 1);
            localStorage.setItem("myLeads", JSON.stringify(myLeads));
            render(myLeads);
        });
    });
}

function openEditModal(index) {
    editingIndex = index;
    const lead = myLeads[index];
    const url = typeof lead === "string" ? lead : lead.url || "";
    const notes = typeof lead === "string" ? "" : lead.notes || "";

    editUrlInput.value = url;
    editNoteInput.value = notes;
    editModal.classList.remove("hidden");
    editUrlInput.focus();
}

function closeEditModal() {
    editModal.classList.add("hidden");
    editingIndex = null;
    editUrlInput.value = "";
    editNoteInput.value = "";
}

deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
});

inputBtn.addEventListener("click", function () {
    if (inputEl.value.trim()) {
        const note = noteEl.value;
        myLeads.push({
            url: inputEl.value,
            notes: note,
        });
        inputEl.value = "";
        noteEl.value = "";
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    }
});

// Edit modal event listeners
saveEditBtn.addEventListener("click", function () {
    if (editingIndex !== null) {
        const url = editUrlInput.value.trim();
        const notes = editNoteInput.value.trim();

        if (url || notes) {
            myLeads[editingIndex] = {
                url: url,
                notes: notes,
            };
            localStorage.setItem("myLeads", JSON.stringify(myLeads));
            render(myLeads);
            closeEditModal();
        } else {
            alert("Please enter at least a URL or a note.");
        }
    }
});

cancelEditBtn.addEventListener("click", function () {
    closeEditModal();
});

// Close modal when clicking outside
editModal.addEventListener("click", function (e) {
    if (e.target === editModal) {
        closeEditModal();
    }
});
