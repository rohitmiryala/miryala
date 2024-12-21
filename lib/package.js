const fs = require('fs');
const path = require('path');

const createPackageJson = (dbDependencies) => {
    const packageJson = {
        name: "express-websocket-template",
        version: "1.0.0",
        description: "A starter template for an Express server with WebSocket and database support",
        main: "server.js",
        scripts: {
            start: "node server.js",
            dev: "nodemon server.js",
        },
        dependencies: {
            express: "^4.18.2",
            ws: "^8.12.0",
            ...dbDependencies,
        },
        devDependencies: {
            nodemon: "^2.0.22",
        },
        author: "Your Name",
        license: "ISC",
    };

    fs.writeFileSync(path.join(process.cwd(), 'package.json'), JSON.stringify(packageJson, null, 2));
    console.log('Created package.json');
};

module.exports = { createPackageJson };