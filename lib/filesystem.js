const fs = require('fs');
const path = require('path');

const createFolders = (folders) => {
    folders.forEach((folder) => {
        const folderPath = path.join(process.cwd(), folder);
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
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

const generateEnvFileContent = (dbChoice) => {
    if (dbChoice === 'mongodb') return `MONGO_URI=\nPORT=4001\nJWT_ACCESS_SECRET=your_access_secret\nJWT_REFRESH_SECRET=your_refresh_secret\nJWT_ACCESS_EXPIRES_IN=1d\nJWT_REFRESH_EXPIRES_IN=30d\nEMAIL_USER=\nEMAIL_PASS=\n`;
    if (dbChoice === 'mysql') return `MYSQL_DB=\nMYSQL_USER=\nMYSQL_PASSWORD=\nMYSQL_HOST=\nPORT=4001\n`;
    if (dbChoice === 'postgresql') return `DATABASE_URL=postgresql://user:password@localhost:5432/mydb\nPORT=4001\nJWT_ACCESS_SECRET=your_access_secret\nJWT_REFRESH_SECRET=your_refresh_secret\nJWT_ACCESS_EXPIRES_IN=1d\nJWT_REFRESH_EXPIRES_IN=30d\nEMAIL_USER=\nEMAIL_PASS=\n`;
    return '';
};

const createFiles = (dbChoice) => {
    const templatesDir = path.join(__dirname, '../templates');
    const serverTemplate = fs.readFileSync(path.join(templatesDir, 'server.js.template'), 'utf-8');
    const appTemplate = fs.readFileSync(path.join(templatesDir, 'app.js.template'), 'utf-8');
    createFile('server.js', serverTemplate.replace('{{DB_FILE}}', `./db/${dbChoice}.js`));
    createFile('app.js', appTemplate);
    createFile('.env', generateEnvFileContent(dbChoice));
};

// ─── Advanced Structure ───────────────────────────────────────────────────────

const createAdvancedStructure = async (dbChoice) => {
    const templatesDir = path.join(__dirname, '../templates/advanced');

    const folders = [
        'src/app',
        'src/builder',
        'src/config',
        'src/constants',
        'src/errors',
        'src/helpers',
        'src/interfaces',
        'src/lib',
        'src/middlewares',
        'src/modules/demo_module',
        'src/routers',
        'src/schemas',
        'src/seed',
        'src/shared',
        'src/types',
        'src/utils',
    ];
    if (dbChoice === 'postgresql') folders.push('prisma', 'generated/prisma');
    createFolders(folders);

    const read = (name) => fs.readFileSync(path.join(templatesDir, name), 'utf-8');

    // Root files
    createFile('.env', generateEnvFileContent(dbChoice));
    createFile('.env.example', generateEnvFileContent(dbChoice));
    createFile('.gitignore', read('gitignore.template'));
    createFile('.prettierrc.json', read('prettierrc.template'));
    createFile('tsconfig.json', read('tsconfig.template'));
    createFile('eslint.config.mjs', read('eslint.template'));

    // src/
    createFile('src/app.ts', read('app.ts.template'));
    createFile('src/server.ts', read('server.ts.template').replace('{{DB_IMPORT}}', dbChoice === 'mongodb' ? read('db_import_mongo.template') : read('db_import_prisma.template')));

    // src/config/
    createFile('src/config/index.ts', read('config.ts.template'));

    // src/constants/
    createFile('src/constants/userRole_constant.ts', read('userRole_constant.ts.template'));

    // src/errors/
    createFile('src/errors/AppError.ts', read('AppError.ts.template'));
    createFile('src/errors/globalErrorHandler.ts', read('globalErrorHandler.ts.template'));

    // src/interfaces/
    createFile('src/interfaces/errors.ts', read('errors_interface.ts.template'));
    createFile('src/interfaces/index.d.ts', read('index.d.ts.template'));

    // src/middlewares/
    createFile('src/middlewares/auth.ts', read('auth.ts.template'));
    createFile('src/middlewares/notFound.ts', read('notFound.ts.template'));
    createFile('src/middlewares/validateRequest.ts', read('validateRequest.ts.template'));
    createFile('src/middlewares/rateLimitingHandler.ts', read('rateLimitingHandler.ts.template'));
    createFile('src/middlewares/handleFileUpload.ts', read('handleFileUpload.ts.template'));

    // src/utils/
    createFile('src/utils/catchAsync.ts', read('catchAsync.ts.template'));
    createFile('src/utils/sendResponse.ts', read('sendResponse.ts.template'));
    createFile('src/utils/commonUtils.ts', read('commonUtils.ts.template'));
    createFile('src/utils/sendEmail.ts', read('sendEmail.ts.template'));
    createFile('src/utils/node_cache.ts', read('node_cache.ts.template'));

    // src/builder/
    if (dbChoice === 'mongodb') {
        createFile('src/builder/QueryBuilder.ts', read('MongooseQueryBuilder.ts.template'));
    } else {
        createFile('src/builder/QueryBuilder.ts', read('PrismaQueryBuilder.ts.template'));
        createFile('src/shared/prisma.ts', read('prisma_shared.template'));
        createFile('prisma/schema.prisma', read('schema.prisma.template'));
    }

    // src/routers/
    createFile('src/routers/index.ts', read('routers_index.ts.template'));

    // src/modules/demo_module/
    createFile('src/modules/demo_module/demo_module.route.ts', read('demo_route.ts.template'));
    createFile('src/modules/demo_module/demo_module.controller.ts', read('demo_controller.ts.template'));
    createFile('src/modules/demo_module/demo_module.service.ts', read('demo_service.ts.template'));
    if (dbChoice === 'mongodb') {
        createFile('src/modules/demo_module/demo_module.model.ts', read('demo_model_mongo.ts.template'));
    }
    createFile('src/modules/demo_module/demo_module.validation.ts', read('demo_validation.ts.template'));

    console.log('✅ Advanced TypeScript project structure created successfully.');
};

module.exports = { createFolders, createFile, createFiles, createAdvancedStructure };