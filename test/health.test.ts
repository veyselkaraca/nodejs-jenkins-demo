import request from 'supertest';
import { app } from '../src/app';

it('repsonds wiht 200', async () => {
  const response = await request(app).get('/api/health');
  expect(response.status).toBe(200);
});
