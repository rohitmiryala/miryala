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
    const mongoDb = dbChoice === 'mongodb'
        ? `MONGO_DATABASE_URL=mongodb://localhost:27017/myapp`
        : `DATABASE_URL=postgresql://user:password@localhost:5432/mydb`;

    return `PORT=5000
NODE_ENV=development
# NODE_ENV=production
# NODE_ENV=seed

# Database
${mongoDb}

# JWT
JWT_ACCESS_TOKEN_SECRET=40051dc52aa534598646248e692db2d70224cf751507a782daee7742f45e92486ca3de2ce447ff10a2ca76032f07bd57624e7f12e38c1d6966438944f04fc4352
JWT_REFRESH_TOKEN_SECRET=037258be634643ed41ace736e5b3a1b4628e6d69889ef3275f4a3097307f3b522db381dda5e477d58f8519fc0e8e32c984497bf3adaa4d228a2e0459743
JWT_ACCESS_TOKEN_EXPIRES_IN=15m
JWT_REFRESH_TOKEN_EXPIRES_IN=30d
BCRYPT_SALT_ROUNDS=10

# Email
EMAIL_HOST_PROVIDER_NAME=smtp.gmail.com
EMAIL_HOST_PROVIDER_PORT=587
EMAIL_SENDER_EMAIL=example@gmail.com
EMAIL_SENDER_EMAIL_APP_PASS=your_app_password
EMAIL_SENDER_NAME=Your App Name
EMAIL_REPLY_TO=example@gmail.com
EMAIL_TEST_RECIPIENTS=example@gmail.com

# Client & Backend URLs
CLIENT_SIDE_URL=http://localhost:5173
# CLIENT_SIDE_URL=your.client.domain.com
BACKEND_SIDE_URL=http://localhost:5000
# BACKEND_SIDE_URL=your.api.domain.com
`;
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
    if (dbChoice === 'mongodb') {
        createFile('src/errors/handleMongooseCastError.ts', read('handleMongooseCastError.ts.template'));
        createFile('src/errors/handleMongooseDuplicateError.ts', read('handleMongooseDuplicateError.ts.template'));
        createFile('src/errors/handleMongooseValidationError.ts', read('handleMongooseValidationError.ts.template'));
    } else {
        createFile('src/errors/handlePrismaCastError.ts', read('handlePrismaCastError.ts.template'));
        createFile('src/errors/handlePrismaDuplicateError.ts', read('handlePrismaDuplicateError.ts.template'));
        createFile('src/errors/handlePrismaValidationError.ts', read('handlePrismaValidationError.ts.template'));
    }

    // src/interfaces/
    createFile('src/interfaces/errors.ts', read('errors_interface.ts.template'));
    createFile('src/interfaces/index.d.ts', read('index.d.ts.template'));
    createFile('src/interfaces/emailFormat.ts', read('emailFormat.ts.template'));
    createFile('src/interfaces/jwtToken_interface.ts', read('jwtToken_interface.ts.template'));
    createFile('src/interfaces/userRole_type.ts', read('userRole_type.ts.template'));

    // src/middlewares/
    createFile('src/middlewares/auth.ts', read('auth.ts.template'));
    createFile('src/middlewares/notFound.ts', read('notFound.ts.template'));
    createFile('src/middlewares/validateRequest.ts', read('validateRequest.ts.template'));
    createFile('src/middlewares/rateLimitingHandler.ts', read('rateLimitingHandler.ts.template'));
    createFile('src/middlewares/handleFileUpload.ts', read('handleFileUpload.ts.template'));
    createFile('src/middlewares/bigIntSerializer.ts', read('bigIntSerializer.ts.template'));
    createFile('src/middlewares/formDataToSetJSONformatData.ts', read('formDataToSetJSONformatData.ts.template'));
    createFile('src/middlewares/morganMiddleware.ts', read('morganMiddleware.ts.template'));

    // src/utils/
    createFile('src/utils/catchAsync.ts', read('catchAsync.ts.template'));
    createFile('src/utils/sendResponse.ts', read('sendResponse.ts.template'));
    createFile('src/utils/commonUtils.ts', read('commonUtils.ts.template'));
    createFile('src/utils/sendEmail.ts', read('sendEmail.ts.template'));
    createFile('src/utils/node_cache.ts', read('node_cache.ts.template'));
    createFile('src/utils/logger.ts', read('logger.ts.template'));
    createFile('src/utils/removeUploadedFiles.ts', read('removeUploadedFiles.ts.template'));

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
    createFile('src/modules/demo_module/demo_module.constant.ts', read('demo_module_constant.ts.template'));
    createFile('src/modules/demo_module/demo_module.interface.ts', read('demo_module_interface.ts.template'));
    createFile('src/modules/demo_module/demo_module.helpers.ts', read('demo_module_helpers.ts.template'));
    createFile('src/modules/demo_module/demo_module.lib.ts', read('demo_module_lib.ts.template'));
    createFile('src/modules/demo_module/demo_module.utils.ts', read('demo_module_utils.ts.template'));

    // uploads/
    createFolders(['uploads/images', 'uploads/videos']);
    createFile('uploads/images/.gitkeep', '');
    createFile('uploads/videos/.gitkeep', '');

    console.log('✅ Advanced TypeScript project structure created successfully.');
};

module.exports = { createFolders, createFile, createFiles, createAdvancedStructure };