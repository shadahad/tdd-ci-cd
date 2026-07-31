const request = require('supertest');
const app = require('../../src/app');
const taskStore = require('../../src/taskStore');

describe('Task API (Integration Tests)', () => {
  beforeEach(() => {
    taskStore.clear();
  });

  test('GET /api/tasks - should return empty list initially', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([]);
  });

  test('POST /api/tasks - should create task successfully', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Integration Test Task' });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Integration Test Task');
  });

  test('POST /api/tasks - should return 400 on invalid input', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: '' });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });

  test('DELETE /api/tasks/:id - should remove existing task', async () => {
    const created = taskStore.add('To be deleted');
    const res = await request(app).delete(`/api/tasks/${created.id}`);

    expect(res.statusCode).toEqual(200);
    expect(taskStore.getAll().length).toBe(0);
  });
});