const fs = require('fs');
const path = require('path');

// ─── Basic (legacy) ───────────────────────────────────────────────────────────

const createPackageJson = (dbDependencies) => {
    const packageJson = {
        name: 'express-starter',
        version: '1.0.0',
        description: 'A starter template for an Express server with WebSocket and database support',
        main: 'server.js',
        scripts: { start: 'node server.js', dev: 'nodemon server.js' },
        dependencies: { express: 'latest', ws: 'latest', dotenv: 'latest', ...dbDependencies },
        devDependencies: { nodemon: 'latest' },
        author: 'Your Name',
        license: 'ISC',
    };
    fs.writeFileSync(path.join(process.cwd(), 'package.json'), JSON.stringify(packageJson, null, 2));
    console.log('✅ Created package.json');
};

// ─── Advanced ─────────────────────────────────────────────────────────────────
// NOTE: dependency versions are intentionally left empty here.
// dependencies.js → resolveLatestVersions() will fetch and fill them
// before running `npm install`.

const createAdvancedPackageJson = (dbChoice) => {
    const packageJson = {
        name: 'express-advanced-template',
        version: '1.0.0',
        description: 'Production-ready Express.js backend with TypeScript',
        main: 'dist/server.js',
        scripts: {
            build: 'tsc',
            start: 'node dist/server.js',
            dev: 'ts-node-dev --respawn --transpile-only src/server.ts',
            lint: 'eslint src',
            format: 'prettier --write "src/**/*.ts"',
        },
        // Versions will be resolved and injected by installAdvancedDependencies()
        dependencies: {},
        devDependencies: {},
        engines: {
            node: `>=${process.versions.node.split('.')[0]}.0.0`,
        },
        author: 'Your Name',
        license: 'ISC',
    };
    fs.writeFileSync(path.join(process.cwd(), 'package.json'), JSON.stringify(packageJson, null, 2));
    console.log('✅ Created package.json (versions will be resolved from npm registry)');
};

module.exports = { createPackageJson, createAdvancedPackageJson };
