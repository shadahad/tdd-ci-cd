class TaskStore {
  constructor() {
    this.tasks = [];
    this.currentId = 1;
  }

  getAll() {
    return this.tasks;
  }

  add(title) {
    if (!title || typeof title !== 'string' || title.trim() === '') {
      throw new Error('Task title must be a non-empty string');
    }
    const newTask = {
      id: this.currentId++,
      title: title.trim(),
      completed: false
    };
    this.tasks.push(newTask);
    return newTask;
  }

  delete(id) {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter(task => task.id !== Number(id));
    return this.tasks.length < initialLength;
  }

  clear() {
    this.tasks = [];
    this.currentId = 1;
  }
}

module.exports = new TaskStore();