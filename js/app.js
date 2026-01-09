// GroupThem - Random Group Generator App

// DOM Elements
const studentsTextarea = document.getElementById("students");
const numGroupsInput = document.getElementById("numGroups");
const generateBtn = document.getElementById("generateBtn");
const clearBtn = document.getElementById("clearBtn");
const groupsContainer = document.getElementById("groupsContainer");
const outputSection = document.getElementById("outputSection");
const closeModalBtn = document.getElementById("closeModal");
const saveListBtn = document.getElementById("saveListBtn");
const listNameInput = document.getElementById("listNameInput");
const savedListsContainer = document.getElementById("savedListsContainer");

// Event Listeners
generateBtn.addEventListener("click", generateGroups);
clearBtn.addEventListener("click", clearAll);
saveListBtn.addEventListener("click", saveStudentList);
if (closeModalBtn) {
  closeModalBtn.addEventListener("click", closeModal);
}

// Load saved data from localStorage
window.addEventListener("DOMContentLoaded", () => {
  const savedStudents = localStorage.getItem("students");
  const savedNumGroups = localStorage.getItem("numGroups");

  if (savedStudents) {
    studentsTextarea.value = savedStudents;
  }
  if (savedNumGroups) {
    numGroupsInput.value = savedNumGroups;
  }

  // Load saved lists
  loadSavedLists();
});

// Save data to localStorage
function saveData() {
  localStorage.setItem("students", studentsTextarea.value);
  localStorage.setItem("numGroups", numGroupsInput.value);
}

// Generate Groups Function
function generateGroups() {
  // Get and validate input
  const studentsText = studentsTextarea.value.trim();
  const numGroups = parseInt(numGroupsInput.value);

  if (!studentsText) {
    alert("Please enter at least one student name!");
    return;
  }

  if (numGroups < 1) {
    alert("Number of groups must be at least 1!");
    return;
  }

  // Parse students
  const students = studentsText
    .split("\n")
    .map((name) => name.trim())
    .filter((name) => name.length > 0);

  if (students.length === 0) {
    alert("Please enter at least one student name!");
    return;
  }

  if (numGroups > students.length) {
    alert(
      `You can't create ${numGroups} groups with only ${students.length} student(s)!`
    );
    return;
  }

  // Save data
  saveData();

  // Shuffle students
  const shuffled = shuffleArray([...students]);

  // Create groups
  const groups = Array.from({ length: numGroups }, () => []);

  // Distribute students evenly
  shuffled.forEach((student, index) => {
    groups[index % numGroups].push(student);
  });

  // Display groups
  displayGroups(groups);
}

// Shuffle Array (Fisher-Yates algorithm)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Display Groups
function displayGroups(groups) {
  groupsContainer.innerHTML = "";
  outputSection.classList.remove("hidden");

  // On mobile, show modal
  const rightPanel = document.querySelector(".right-panel");
  if (window.innerWidth <= 600 && rightPanel) {
    rightPanel.classList.add("modal-active");
  }

  groups.forEach((group, index) => {
    const groupCard = document.createElement("div");
    groupCard.className = "group-card";
    groupCard.style.animationDelay = `${index * 0.1}s`;

    const groupTitle = document.createElement("h3");
    groupTitle.textContent = `Group ${index + 1}`;

    const memberCount = document.createElement("span");
    memberCount.className = "member-count";
    memberCount.textContent = `(${group.length})`;
    groupTitle.appendChild(memberCount);

    const studentList = document.createElement("ul");
    group.forEach((student) => {
      const listItem = document.createElement("li");
      listItem.textContent = student;
      studentList.appendChild(listItem);
    });

    groupCard.appendChild(groupTitle);
    groupCard.appendChild(studentList);
    groupsContainer.appendChild(groupCard);
  });
}

// Clear All
function clearAll() {
  if (confirm("Are you sure you want to clear all data?")) {
    studentsTextarea.value = "";
    numGroupsInput.value = "2";
    groupsContainer.innerHTML = "";
    outputSection.classList.add("hidden");
    closeModal();
    localStorage.removeItem("students");
    localStorage.removeItem("numGroups");
  }
}

// Close Modal
function closeModal() {
  const rightPanel = document.querySelector(".right-panel");
  if (rightPanel) {
    rightPanel.classList.remove("modal-active");
  }
}

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  // Ctrl/Cmd + Enter to generate groups
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    e.preventDefault();
    generateGroups();
  }
  // Escape to close modal
  if (e.key === "Escape") {
    closeModal();
  }
});

// Save Student List Function
function saveStudentList() {
  const listName = listNameInput.value.trim();

  if (!listName) {
    alert("Please enter a name for the list!");
    return;
  }

  const studentsList = studentsTextarea.value.trim();
  if (!studentsList) {
    alert("Please enter at least one student name!");
    return;
  }

  // Get existing lists
  let savedLists = JSON.parse(localStorage.getItem("studentLists")) || [];

  // Check if name already exists
  if (savedLists.some((list) => list.name === listName)) {
    alert("A list with this name already exists!");
    return;
  }

  // Add new list
  savedLists.push({
    id: Date.now(),
    name: listName,
    students: studentsList,
  });

  // Save to localStorage
  localStorage.setItem("studentLists", JSON.stringify(savedLists));

  // Clear input
  listNameInput.value = "";

  // Reload lists
  loadSavedLists();
}

// Load Saved Lists Function
function loadSavedLists() {
  const savedLists = JSON.parse(localStorage.getItem("studentLists")) || [];
  savedListsContainer.innerHTML = "";

  if (savedLists.length === 0) {
    savedListsContainer.innerHTML =
      '<div style="font-size: 0.9rem; color: #999; padding: 10px; text-align: center;">No saved lists yet</div>';
    return;
  }

  savedLists.forEach((list) => {
    const listItem = document.createElement("div");
    listItem.className = "list-item";
    listItem.dataset.id = list.id;

    const listName = document.createElement("div");
    listName.className = "list-item-name";
    listName.textContent = list.name;
    listName.onclick = () => loadList(list.id);

    const buttonsDiv = document.createElement("div");
    buttonsDiv.className = "list-item-buttons";

    const renameBtn = document.createElement("button");
    renameBtn.className = "list-item-btn";
    renameBtn.textContent = "✎";
    renameBtn.title = "Rename";
    renameBtn.onclick = () => renameList(list.id, listName);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "list-item-btn list-item-delete";
    deleteBtn.textContent = "✕";
    deleteBtn.title = "Delete";
    deleteBtn.onclick = () => deleteList(list.id);

    buttonsDiv.appendChild(renameBtn);
    buttonsDiv.appendChild(deleteBtn);

    listItem.appendChild(listName);
    listItem.appendChild(buttonsDiv);
    savedListsContainer.appendChild(listItem);
  });
}

// Load List Function
function loadList(id) {
  const savedLists = JSON.parse(localStorage.getItem("studentLists")) || [];
  const list = savedLists.find((l) => l.id === id);

  if (list) {
    studentsTextarea.value = list.students;
    saveData();
  }
}

// Rename List Function
function renameList(id, nameElement) {
  const savedLists = JSON.parse(localStorage.getItem("studentLists")) || [];
  const list = savedLists.find((l) => l.id === id);

  if (!list) return;

  const input = document.createElement("input");
  input.className = "list-item-input";
  input.type = "text";
  input.value = list.name;

  nameElement.replaceWith(input);
  input.focus();
  input.select();

  function saveRename() {
    const newName = input.value.trim();

    if (!newName) {
      alert("List name cannot be empty!");
      input.replaceWith(nameElement);
      return;
    }

    if (savedLists.some((l) => l.name === newName && l.id !== id)) {
      alert("A list with this name already exists!");
      input.replaceWith(nameElement);
      return;
    }

    list.name = newName;
    localStorage.setItem("studentLists", JSON.stringify(savedLists));
    loadSavedLists();
  }

  input.addEventListener("blur", saveRename);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") saveRename();
    if (e.key === "Escape") input.replaceWith(nameElement);
  });
}

// Delete List Function
function deleteList(id) {
  if (!confirm("Are you sure you want to delete this list?")) return;

  let savedLists = JSON.parse(localStorage.getItem("studentLists")) || [];
  savedLists = savedLists.filter((l) => l.id !== id);
  localStorage.setItem("studentLists", JSON.stringify(savedLists));
  loadSavedLists();
}
