const express = require('express');
const mongoose = require('mongoose');
const Joke = require('./models/joke');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

mongoose.connect('mongodb://localhost:27017/jokesdb', {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 450000,
  maxPoolSize: 10,
});

app.use((req, res, next) => {
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Keep-Alive', 'timeout=1000, max=3000');
  next();
});

app.get('/api/jokes', async (req, res) => {
  const count = await Joke.countDocuments();
  const random = Math.floor(Math.random() * count);
  const joke = await Joke.findOne().skip(random);
  res.json(joke);
});

app.use(express.static(path.join(__dirname, '../public')));

module.exports = app;