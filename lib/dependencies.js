const { execSync } = require('child_process');

const getLatestVersion = async (packageName) => {
    try {
        const version = execSync(`npm show ${packageName} version`).toString().trim();
        return version;
    } catch (err) {
        console.error(`Error fetching version for ${packageName}:`, err);
        return null;
    }
};

const installDependencies = (dbDependencies) => {
    console.log('Installing dependencies...');
    const commonDependencies = ['express', 'ws', 'dotenv'];
    const dbPackages = Object.keys(dbDependencies);
    execSync(`npm install ${[...commonDependencies, ...dbPackages].join(' ')}`, { stdio: 'inherit' });
    execSync('npm install --save-dev nodemon', { stdio: 'inherit' });
    console.log('Dependencies installed successfully.');
};

const installAdvancedDependencies = (dbChoice) => {
    console.log('\n📦 Installing dependencies...');
    const deps = ['express', 'cors', 'dotenv', 'cookie-parser', 'bcryptjs', 'jsonwebtoken', 'zod', 'multer', 'nodemailer', 'node-cache', 'axios'];
    if (dbChoice === 'mongodb') deps.push('mongoose');
    if (dbChoice === 'postgresql') deps.push('@prisma/client', '@prisma/adapter-pg', 'pg');

    execSync(`npm install ${deps.join(' ')}`, { stdio: 'inherit' });

    const devDeps = [
        'nodemon', 'typescript', 'ts-node-dev',
        '@types/express', '@types/cors', '@types/cookie-parser',
        '@types/bcryptjs', '@types/jsonwebtoken', '@types/multer',
        '@types/nodemailer', '@types/node',
        'eslint', 'prettier', 'typescript-eslint',
        'eslint-config-prettier', 'eslint-plugin-prettier'
    ];
    if (dbChoice === 'postgresql') devDeps.push('prisma');

    execSync(`npm install --save-dev ${devDeps.join(' ')}`, { stdio: 'inherit' });

    if (dbChoice === 'postgresql') {
        console.log('\n🔧 Initializing Prisma...');
        execSync('npx prisma generate', { stdio: 'inherit' });
    }
    console.log('\n✅ Dependencies installed successfully.');
};

module.exports = { getLatestVersion, installDependencies, installAdvancedDependencies };