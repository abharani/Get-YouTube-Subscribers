// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const app = require('./app.js');
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 4000;

app.use(cors());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to the database
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/yt-subs';
console.log(DATABASE_URL);

mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.once('open', () => console.log('connected to database'));

// Error handler middleware
const errorHandler = (err, req, res, next) => {
    const { statusCode = 500, message = 'Something went wrong' } = err;
    console.log(err);
    res.status(statusCode).send(message);
};

app.use(errorHandler);

// Start the server
app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});