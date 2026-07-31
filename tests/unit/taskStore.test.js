const taskStore = require('../../src/taskStore');

describe('TaskStore (Unit Tests)', () => {
  beforeEach(() => {
    taskStore.clear();
  });

  test('should initialize with empty tasks', () => {
    expect(taskStore.getAll()).toEqual([]);
  });

  test('should add a valid task', () => {
    const task = taskStore.add('Learn TDD');
    expect(task).toEqual({ id: 1, title: 'Learn TDD', completed: false });
    expect(taskStore.getAll().length).toBe(1);
  });

  test('should throw error when adding invalid task title', () => {
    expect(() => taskStore.add('')).toThrow('Task title must be a non-empty string');
    expect(() => taskStore.add(123)).toThrow('Task title must be a non-empty string');
  });

  test('should delete task by ID', () => {
    const task = taskStore.add('Delete me');
    const result = taskStore.delete(task.id);
    expect(result).toBe(true);
    expect(taskStore.getAll().length).toBe(0);
  });
});