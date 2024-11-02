document.addEventListener('DOMContentLoaded', loadTasks);

const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

addTaskBtn.addEventListener('click', addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const taskItem = createTaskElement(taskText);
  taskList.appendChild(taskItem);
  saveTasks();
  taskInput.value = '';
}

function createTaskElement(taskText) {
  const taskItem = document.createElement('li');
  taskItem.className = 'task-item';

  const taskInputField = document.createElement('input');
  taskInputField.type = 'text';
  taskInputField.value = taskText;
  taskInputField.disabled = true;
  taskItem.appendChild(taskInputField);

  const editBtn = document.createElement('button');
  editBtn.innerHTML = '<i class="fas fa-edit"></i>';
  editBtn.addEventListener('click', () => {
    if (taskInputField.disabled) {
      taskInputField.disabled = false;
      taskInputField.focus();
      editBtn.innerHTML = '<i class="fas fa-save"></i>';
    } else {
      taskInputField.disabled = true;
      editBtn.innerHTML = '<i class="fas fa-edit"></i>';
      saveTasks();
    }
  });
  taskItem.appendChild(editBtn);

  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  deleteBtn.addEventListener('click', () => {
    taskItem.remove();
    saveTasks();
  });
  taskItem.appendChild(deleteBtn);

  return taskItem;
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll('.task-item input[type="text"]').forEach(taskInput => {
    tasks.push(taskInput.value);
  });
  document.cookie = `tasks=${JSON.stringify(tasks)};path=/`;
}

function loadTasks() {
  const tasksCookie = document.cookie.split('; ').find(row => row.startsWith('tasks='));
  if (!tasksCookie) return;

  const tasks = JSON.parse(tasksCookie.split('=')[1]);
  tasks.forEach(taskText => {
    const taskItem = createTaskElement(taskText);
    taskList.appendChild(taskItem);
  });
}
