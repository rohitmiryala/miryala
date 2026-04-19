const fs = require('fs');
const path = require('path');

const createPackageJson = (dbDependencies) => {
    const packageJson = {
        name: "express-websocket-template",
        version: "1.0.0",
        description: "A starter template for an Express server with WebSocket and database support",
        main: "server.js",
        scripts: { start: "node server.js", dev: "nodemon server.js" },
        dependencies: { express: "^4.18.2", ws: "^8.12.0", ...dbDependencies },
        devDependencies: { nodemon: "^2.0.22" },
        author: "Your Name",
        license: "ISC",
    };
    fs.writeFileSync(path.join(process.cwd(), 'package.json'), JSON.stringify(packageJson, null, 2));
    console.log('Created package.json');
};

const createAdvancedPackageJson = (dbChoice) => {
    const deps = {
        express: "^5.1.0",
        cors: "^2.8.5",
        dotenv: "^16.0.0",
        'cookie-parser': "^1.4.7",
        bcryptjs: "^3.0.2",
        jsonwebtoken: "^9.0.2",
        zod: "^3.24.1",
        multer: "^2.0.0",
        nodemailer: "^7.0.0",
        'node-cache': "^5.1.2",
        axios: "^1.12.2",
    };
    if (dbChoice === 'mongodb') deps.mongoose = "^9.1.5";
    if (dbChoice === 'postgresql') {
        deps['@prisma/client'] = "^7.3.0";
        deps['@prisma/adapter-pg'] = "^7.3.0";
        deps.pg = "^8.18.0";
    }

    const devDeps = {
        nodemon: "^3.1.9",
        typescript: "^5.9.2",
        'ts-node-dev': "^2.0.0",
        '@types/express': "^5.0.3",
        '@types/cors': "^2.8.19",
        '@types/cookie-parser': "^1.4.9",
        '@types/bcryptjs': "^2.4.6",
        '@types/jsonwebtoken': "^9.0.10",
        '@types/multer': "^2.0.0",
        '@types/nodemailer': "^7.0.1",
        '@types/node': "^22.0.0",
        eslint: "^9.35.0",
        prettier: "^3.6.2",
        'typescript-eslint': "^8.43.0",
        'eslint-config-prettier': "^10.1.8",
        'eslint-plugin-prettier': "^5.5.4",
    };
    if (dbChoice === 'postgresql') devDeps.prisma = "^7.3.0";

    const packageJson = {
        name: "express-advanced-template",
        version: "1.0.0",
        description: "Production-ready Express.js backend with TypeScript",
        main: "dist/server.js",
        scripts: {
            build: "tsc",
            start: "node dist/server.js",
            dev: "ts-node-dev --respawn --transpile-only src/server.ts",
            lint: "eslint src",
            format: "prettier --write \"src/**/*.ts\""
        },
        dependencies: deps,
        devDependencies: devDeps,
        author: "Your Name",
        license: "ISC",
    };
    fs.writeFileSync(path.join(process.cwd(), 'package.json'), JSON.stringify(packageJson, null, 2));
    console.log('✅ Created package.json');
};

module.exports = { createPackageJson, createAdvancedPackageJson };