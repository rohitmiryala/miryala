const express = require('express');
const WebSocket = require('ws');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Example route
app.get('/', (req, res) => {
    res.send('Welcome to the Express Starter Template');
});

// Start the Express server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Set up WebSocket server
const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
    console.log('Client connected via WebSocket');
    ws.on('message', (message) => {
        console.log('Received:', message);
    });
    ws.send('Welcome to the WebSocket server');
});

// Integrate WebSocket into the Express server
server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});