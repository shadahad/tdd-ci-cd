const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const errorBox = document.getElementById('error-box');

// Fetch and render tasks on initial load
document.addEventListener('DOMContentLoaded', fetchTasks);

async function fetchTasks() {
  try {
    const res = await fetch('/api/tasks');
    const tasks = await res.json();
    renderTasks(tasks);
  } catch (err) {
    showError('Failed to load tasks.');
  }
}

taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  hideError();
  const title = taskInput.value.trim();

  try {
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Failed to create task');
    }

    taskInput.value = '';
    fetchTasks();
  } catch (err) {
    showError(err.message);
  }
});

async function deleteTask(id) {
  try {
    const res = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete task');
    fetchTasks();
  } catch (err) {
    showError(err.message);
  }
}

function renderTasks(tasks) {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${escapeHtml(task.title)}</span>
      <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

function showError(msg) {
  errorBox.textContent = msg;
  errorBox.classList.remove('hidden');
}

function hideError() {
  errorBox.classList.add('hidden');
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (m) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  }[m]));
}