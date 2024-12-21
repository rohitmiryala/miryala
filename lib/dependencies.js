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

module.exports = { getLatestVersion, installDependencies };