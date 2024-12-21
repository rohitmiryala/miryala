#!/usr/bin/env node

const readline = require('readline');
const { setupDatabase } = require('../lib/database');
const { createFolders, createFiles } = require('../lib/filesystem');
const { createPackageJson } = require('../lib/package');
const { installDependencies } = require('../lib/dependencies');

const initProject = () => {
    console.log('Initializing Express project...');

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.question('Which database would you like to use? (mongodb/mysql): ', async (dbChoice) => {
        const validChoices = ['mongodb', 'mysql'];
        if (!validChoices.includes(dbChoice.toLowerCase())) {
            console.log('Invalid choice. Exiting setup.');
            rl.close();
            return;
        }

        

        // Create folders and files
        createFolders(['controllers', 'middlewares', 'models', 'services', 'utils', 'routes', 'db']);

        // Setup database and get dependencies
        const dbDependencies = await setupDatabase(dbChoice.toLowerCase());
        
        createFiles(dbChoice.toLowerCase());

        // Create package.json
        createPackageJson(dbDependencies);

        // Install dependencies
        installDependencies(dbDependencies);

        console.log('Setup complete! Use "npm run dev" to start your project.');
        rl.close();
    });
};

// Run the script
initProject();