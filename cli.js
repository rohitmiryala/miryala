#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Function to get the latest version of a package from npm
const getLatestVersion = (packageName) => {
    try {
        const version = execSync(`npm show ${packageName} version`).toString().trim();
        return version;
    } catch (err) {
        console.error(`Error fetching version for ${packageName}:`, err);
        return null;
    }
};

// Function to create or update package.json
const createPackageJson = () => {
    const expressVersion = getLatestVersion('express');
    const wsVersion = getLatestVersion('ws');
    const nodemonVersion = getLatestVersion('nodemon');

    if (!expressVersion || !wsVersion || !nodemonVersion) {
        console.log('Error: Could not fetch the latest versions.');
        return;
    }

    const packageJson = {
        name: "express-websocket-template",
        version: "1.0.0",
        description: "A starter template for an Express server with WebSocket support",
        main: "server.js",
        scripts: {
            start: "node server.js",
            dev: "nodemon server.js"
        },
        dependencies: {
            express: `^${expressVersion}`,
            ws: `^${wsVersion}`
        },
        devDependencies: {
            nodemon: `^${nodemonVersion}`
        },
        author: "Your Name",
        license: "ISC"
    };

    fs.writeFileSync(path.join(process.cwd(), 'package.json'), JSON.stringify(packageJson, null, 2));
    console.log('Created package.json with latest versions');
};

// Function to create a folder if it doesn't exist
const createFolder = (folderName) => {
    const folderPath = path.join(process.cwd(), folderName);
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
        console.log(`Created folder: ${folderName}`);
    } else {
        console.log(`Folder already exists: ${folderName}`);
    }
};

// Function to create a file with content
const createFile = (fileName, content) => {
    const filePath = path.join(process.cwd(), fileName);
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, content);
        console.log(`Created file: ${fileName}`);
    } else {
        console.log(`File already exists: ${fileName}`);
    }
};

// Main function
const initProject = () => {
    console.log('Initializing Express project...');

    // Create folders
    const folders = ['controllers', 'middlewares', 'models', 'services', 'utils', 'routes'];
    folders.forEach(createFolder);

    // Create files
    createFile('server.js', `const app = require('./app');
const WebSocket = require('ws');

// Start the Express server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(\`Server is running on port \${PORT}\`);
});

// WebSocket setup
const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
    console.log('Client connected via WebSocket');
    ws.on('message', (message) => {
        console.log('Received:', message);
    });
    ws.send('Welcome to the WebSocket server');
});

server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});
`);

    createFile('app.js', `const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Welcome to the Express Starter Template');
});

module.exports = app;
`);

    console.log('Project structure created.');

    // Create or update package.json
    createPackageJson();

    // Install dependencies
    console.log('Installing dependencies...');
    execSync('npm install express ws', { stdio: 'inherit' });
    execSync('npm install --save-dev nodemon', { stdio: 'inherit' });

    console.log('Setup complete! Use "npm run dev" to start your project.');
};

// Run the script
initProject();