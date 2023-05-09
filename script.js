const form = document.getElementById("form");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const incompleteButton = document.getElementById("incompleteButton");
const completedButton = document.getElementById("completedButton");

let tasks = [];

// function to add a task
function addTask(event) {
  event.preventDefault();
  if (taskInput.value.trim() !== "") {
    tasks.push({ name: taskInput.value.trim(), completed: false });
    updateList();
    taskInput.value = "";
  }
}

// function to update the task list
function updateList() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.name;
    if (task.completed) {
      li.classList.add("completed");
    }
    const button = document.createElement("button");
    button.textContent = "Delete";
    button.addEventListener("click", () => {
      deleteTask(index);
    });
    li.appendChild(button);
    li.addEventListener("click", () => {
      toggleCompleted(index);
    });
    taskList.appendChild(li);
  });
}

// function to toggle a task between completed and incomplete
function toggleCompleted(index) {
  tasks[index].completed = !tasks[index].completed;
  updateList();
}

// function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  updateList();
}

// function to filter completed tasks
function showCompleted() {
  const completedTasks = tasks.filter(task => task.completed);
  tasks = completedTasks;
  updateList();
}

// function to filter incomplete tasks
function showIncomplete() {
  const incompleteTasks = tasks.filter(task => !task.completed);
  tasks = incompleteTasks;
  updateList();
}

// event listeners
form.addEventListener("submit", addTask);
completedButton.addEventListener("click", showCompleted);
incompleteButton.addEventListener("click", showIncomplete);