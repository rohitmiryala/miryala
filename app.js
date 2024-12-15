const express = require('express');
const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Example route
app.get('/', (req, res) => {
    res.send('Welcome to the Express Starter Template');
});

// Placeholder for additional routes
// Example: app.use('/api', require('./routes/api'));

module.exports = app;