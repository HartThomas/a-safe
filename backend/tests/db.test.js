const request = require('supertest');
const app = require('../app'); 
const mongoose = require('mongoose');

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/jokesdb');
});

afterAll(async () => {
  await mongoose.disconnect();
});

test('GET /api/jokes returns something from real DB', async () => {
  const res = await request(app).get('/api/jokes');
  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty('punchline');
});