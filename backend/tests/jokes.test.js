const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const Joke = require('../models/joke'); 

let app;
let server;
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri);

  app = express();

  app.get('/api/jokes', async (req, res) => {
    const count = await Joke.countDocuments();
    const random = Math.floor(Math.random() * count);
    const joke = await Joke.findOne().skip(random);
    res.json(joke);
  });

});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Joke.deleteMany({});
});

test('GET /api/jokes returns a joke', async () => {
  await Joke.create({ punchline: 'Why did the chicken cross the road?', setup: 'To get to the other side!' });

  const res = await request(app).get('/api/jokes');
  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty('punchline');
  expect(res.body.punchline).toBe('Why did the chicken cross the road?');
});