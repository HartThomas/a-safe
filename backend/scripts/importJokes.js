const mongoose = require('mongoose');
const Joke = require('../models/joke');
const jokes = require('../jokes.json');

async function importJokes() {
    try {
        await mongoose.connect('mongodb://localhost:27017/jokesdb');

        await Joke.deleteMany({}); 

        const jokeDocs = jokes.map(joke => ({
            setup: joke.setup,
            punchline: joke.punchline,
            type: joke.type,
        }));

        await Joke.insertMany(jokeDocs);
        console.log('Jokes imported successfully!');
    } catch (error) {
        console.error('Error importing jokes:', error);
    } finally {
        await mongoose.disconnect();
    }
}

importJokes();