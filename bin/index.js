#!/usr/bin/env node

const inquirer = require('inquirer');
const { createAdvancedStructure } = require('../lib/filesystem');
const { createAdvancedPackageJson } = require('../lib/package');
const { installAdvancedDependencies } = require('../lib/dependencies');

const initProject = async () => {
    console.log('\n🚀 Welcome to Miryala - Advanced TypeScript Express.js Backend Generator\n');

    try {
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'database',
                message: 'Which database would you like to use?',
                choices: [
                    {
                        name: '🍃 MongoDB (with Mongoose)',
                        value: 'mongodb',
                        short: 'MongoDB'
                    },
                    {
                        name: '🐘 PostgreSQL (with Prisma)',
                        value: 'postgresql',
                        short: 'PostgreSQL'
                    }
                ],
                default: 'mongodb'
            }
        ]);

        const dbChoice = answers.database;

        console.log(`\n✨ Creating project structure with ${dbChoice.toUpperCase()}...\n`);

        await createAdvancedStructure(dbChoice);
        createAdvancedPackageJson(dbChoice);
        installAdvancedDependencies(dbChoice);

        console.log('\n✅ Setup complete!\n');
        console.log('📝 Next steps:');
        console.log('   1. Update your .env file with database credentials');
        if (dbChoice === 'postgresql') {
            console.log('   2. Run "npx prisma migrate dev" to create your database schema');
        }
        console.log(`   ${dbChoice === 'postgresql' ? '3' : '2'}. Run "npm run dev" to start development server\n`);
    } catch (error) {
        if (error.isTtyError) {
            console.error('\n❌ Prompt couldn\'t be rendered in the current environment');
        } else {
            console.error('\n❌ An error occurred:', error.message);
        }
        process.exit(1);
    }
};

initProject();