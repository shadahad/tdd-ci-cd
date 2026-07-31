const express = require('express');
const path = require('path');
const taskStore = require('./taskStore');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// API Endpoints
app.get('/api/tasks', (req, res) => {
  res.json(taskStore.getAll());
});

app.post('/api/tasks', (req, res) => {
  try {
    const { title } = req.body;
    const newTask = taskStore.add(title);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/tasks/:id', (req, res) => {
  const success = taskStore.delete(req.params.id);
  if (!success) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.status(200).json({ message: 'Task deleted successfully' });
});

module.exports = app;