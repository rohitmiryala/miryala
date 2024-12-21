const fs = require('fs');
const path = require('path');

const createFolders = (folders) => {
    folders.forEach((folder) => {
        const folderPath = path.join(process.cwd(), folder);
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
            console.log(`Created folder: ${folder}`);
        } else {
            console.log(`Folder already exists: ${folder}`);
        }
    });
};

const createFile = (fileName, content) => {
    const filePath = path.join(process.cwd(), fileName);
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, content);
        console.log(`Created file: ${fileName}`);
    } else {
        console.log(`File already exists: ${fileName}`);
    }
};

// Function to generate .env content based on database choice
const generateEnvFileContent = (dbChoice) => {
    let content = '';
    if (dbChoice === 'mongodb') {
        content = `

MONGO_URI=
PORT=4001

`;
    } else if (dbChoice === 'mysql') {
        content = `
MYSQL_DB=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_HOST=
PORT=4001
`;
    }
    return content;
};

const createFiles = (dbChoice) => {
    const templatesDir = path.join(__dirname, '../templates');
    const serverTemplate = fs.readFileSync(path.join(templatesDir, 'server.js.template'), 'utf-8');
    const appTemplate = fs.readFileSync(path.join(templatesDir, 'app.js.template'), 'utf-8');

    createFile('server.js', serverTemplate.replace('{{DB_FILE}}', `./db/${dbChoice}.js`));
    createFile('app.js', appTemplate);

    const envFileContent = generateEnvFileContent(dbChoice);
    createFile('.env', envFileContent);
};

module.exports = { createFolders, createFile, createFiles };