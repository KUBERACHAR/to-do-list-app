// DOM Elements
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const warning = document.getElementById('warning');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks on page load
renderTasks();

// Add Task
addBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (!text) {
    warning.textContent = '⚠️ Task cannot be empty!';
    return;
  }

  const newTask = {
    id: Date.now(),
    text,
    completed: false
  };

  try {
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
    warning.textContent = '';
    renderTasks();
  } catch (error) {
    warning.textContent = "⚠️ Couldn't save your task. Please try again.";
  }
});

// Render Tasks
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleComplete(task.id));

    const span = document.createElement('span');
    span.textContent = task.text;
    span.className = 'task-text';

    const actions = document.createElement('div');
    actions.className = 'task-actions';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit 🖋️';
    editBtn.onclick = () => editTask(task.id);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete 🗑';
    deleteBtn.onclick = () => deleteTask(task.id);

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(actions);

    taskList.appendChild(li);
  });
}

// Toggle Completion
function toggleComplete(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

// Edit Task
function editTask(id) {
  const task = tasks.find(t => t.id === id);
  const newText = prompt('Edit your task:', task.text);
  if (newText !== null && newText.trim()) {
    task.text = newText.trim();
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  } else {
    warning.textContent = '⚠️ Task cannot be empty!';
  }
}

// Delete Task
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}