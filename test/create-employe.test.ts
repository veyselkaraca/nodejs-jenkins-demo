import request from 'supertest';
import { app } from '../src/app';

it('repsonds wiht 200', async () => {
  const response = await request(app)
    .post('/api/employees')
    .send({ name: 'John', surname: 'Doe', job: 'Developer' });
  expect(response.status).toBe(200);
  expect(response.body).toEqual({ id: 1, name: 'John', surname: 'Doe', job: 'Developer' });
});

it('repsonds wiht 400 with missing job', async () => {
  const response = await request(app).post('/api/employees').send({ name: 'John', surname: 'Doe' });
  expect(response.status).toBe(400);
});

it('repsonds wiht 400 with missing surname', async () => {
  const response = await request(app)
    .post('/api/employees')
    .send({ name: 'John', job: 'Developer' });
  expect(response.status).toBe(400);
});

it('repsonds wiht 400 with missing name', async () => {
  const response = await request(app)
    .post('/api/employees')
    .send({ surname: 'Doe', job: 'Developer' });
  expect(response.status).toBe(400);
});

it('repsonds wiht 400 with missing surname and job', async () => {
  const response = await request(app).post('/api/employees').send({ name: 'John' });
  expect(response.status).toBe(400);
});

it('repsonds wiht 400 with missing name and job', async () => {
  const response = await request(app).post('/api/employees').send({ surname: 'Doe' });
  expect(response.status).toBe(400);
});

it('repsonds wiht 400 with missing name and surname', async () => {
  const response = await request(app).post('/api/employees').send({ job: 'Developer' });
  expect(response.status).toBe(400);
});

it('repsonds wiht 400 with missing name, surname and job', async () => {
  const response = await request(app).post('/api/employees').send({});
  expect(response.status).toBe(400);
});
