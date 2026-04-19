# Miryala

**Miryala** is a CLI tool that scaffolds a production-ready **TypeScript Express.js backend** in seconds — with MongoDB or PostgreSQL, authentication, logging, validation, error handling, rate limiting, file uploads, caching, and more. No boilerplate. Just build.

---

## ✨ Features

### 🏗️ Complete Project Structure
- Modular architecture — `modules`, `middlewares`, `utils`, `routers`, `errors`, `interfaces`
- TypeScript with strict mode, ESLint, and Prettier pre-configured
- Centralized environment config and error handling
- Demo module included as a working reference

### 🗄️ Database Support
- **MongoDB** — Mongoose with fluent query builder
- **PostgreSQL** — Prisma with fluent query builder

### 🔐 Security & Authentication
- JWT authentication with role-based access control
- Progressive rate limiting
- Input validation with Zod schemas
- CORS, cookie parser, and BigInt serializer configured

### 📋 Logging
- **Winston** — structured logging with levels (info, error, warn, debug)
- **Morgan** — HTTP request/response logging piped into Winston
- Logs organized by month: `logs/YYYY-MM/YYYY-MM-DD-combined.log`
- Separate error log, exception log, and rejection log files

### 🛠️ Built-in Utilities
- File uploads with Multer
- Email sending with Nodemailer
- In-memory caching with node-cache
- OTP generation, JWT helpers, phone/email validation
- File cleanup utilities

### 📦 Ready-to-Use Middlewares
- `auth` — JWT authentication & role-based authorization
- `validateRequest` — Zod schema validation
- `rateLimitingHandler` — progressive rate limiting
- `handleFileUpload` — Multer file upload
- `bigIntSerializer` — BigInt to string in JSON responses
- `formDataToSetJSONformatData` — JSON parsing from multipart form data
- `globalErrorHandler` — centralized error handling (Mongoose + Prisma + Zod)
- `notFound` — 404 handler

---

## 🚀 Quick Start

No installation required:

```bash
npx miryala
```

Or install globally:

```bash
npm install -g miryala
miryala
```

---

## 📖 Usage

### Step 1 — Run the CLI

```bash
npx miryala
```

### Step 2 — Select your database

```
? Which database would you like to use?
❯ 🍃 MongoDB  (Mongoose)
  🐘 PostgreSQL (Prisma)
```

Use arrow keys to select, then press **Enter**.

### Step 3 — Wait for setup

The CLI will:
- Create the full project structure
- Resolve and install the latest compatible package versions
- Generate all boilerplate files

### Step 4 — Configure `.env`

**MongoDB:**
```env
PORT=5000
NODE_ENV=development

MONGO_DATABASE_URL=mongodb://localhost:27017/myapp

JWT_ACCESS_TOKEN_SECRET=your_access_secret
JWT_REFRESH_TOKEN_SECRET=your_refresh_secret
JWT_ACCESS_TOKEN_EXPIRES_IN=15m
JWT_REFRESH_TOKEN_EXPIRES_IN=30d
BCRYPT_SALT_ROUNDS=10

EMAIL_HOST_PROVIDER_NAME=smtp.gmail.com
EMAIL_HOST_PROVIDER_PORT=587
EMAIL_SENDER_EMAIL=example@gmail.com
EMAIL_SENDER_EMAIL_APP_PASS=your_app_password
EMAIL_SENDER_NAME=Your App Name
EMAIL_REPLY_TO=example@gmail.com

CLIENT_SIDE_URL=http://localhost:5173
BACKEND_SIDE_URL=http://localhost:5000
```

**PostgreSQL:**
```env
PORT=5000
NODE_ENV=development

DATABASE_URL=postgresql://user:password@localhost:5432/myapp

JWT_ACCESS_TOKEN_SECRET=your_access_secret
JWT_REFRESH_TOKEN_SECRET=your_refresh_secret
JWT_ACCESS_TOKEN_EXPIRES_IN=15m
JWT_REFRESH_TOKEN_EXPIRES_IN=30d
BCRYPT_SALT_ROUNDS=10

EMAIL_HOST_PROVIDER_NAME=smtp.gmail.com
EMAIL_HOST_PROVIDER_PORT=587
EMAIL_SENDER_EMAIL=example@gmail.com
EMAIL_SENDER_EMAIL_APP_PASS=your_app_password
EMAIL_SENDER_NAME=Your App Name
EMAIL_REPLY_TO=example@gmail.com

CLIENT_SIDE_URL=http://localhost:5173
BACKEND_SIDE_URL=http://localhost:5000
```

### Step 5 — PostgreSQL only: create schema

```bash
npx prisma migrate dev --name init
```

### Step 6 — Start development

```bash
npm run dev
```

Open `http://localhost:5000` in your browser.

---

## 📁 Generated Project Structure

```
my-project/
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── builder/
│   │   └── QueryBuilder.ts
│   ├── config/
│   │   └── index.ts
│   ├── constants/
│   │   └── userRole_constant.ts
│   ├── errors/
│   │   ├── AppError.ts
│   │   ├── globalErrorHandler.ts
│   │   └── handleMongoose*.ts / handlePrisma*.ts
│   ├── interfaces/
│   │   ├── errors.ts
│   │   ├── emailFormat.ts
│   │   ├── jwtToken_interface.ts
│   │   ├── userRole_type.ts
│   │   └── index.d.ts
│   ├── middlewares/
│   │   ├── auth.ts
│   │   ├── bigIntSerializer.ts
│   │   ├── formDataToSetJSONformatData.ts
│   │   ├── globalErrorHandler.ts
│   │   ├── handleFileUpload.ts
│   │   ├── morganMiddleware.ts
│   │   ├── notFound.ts
│   │   ├── rateLimitingHandler.ts
│   │   └── validateRequest.ts
│   ├── modules/
│   │   └── demo_module/
│   │       ├── demo_module.constant.ts
│   │       ├── demo_module.controller.ts
│   │       ├── demo_module.helpers.ts
│   │       ├── demo_module.interface.ts
│   │       ├── demo_module.lib.ts
│   │       ├── demo_module.model.ts
│   │       ├── demo_module.route.ts
│   │       ├── demo_module.service.ts
│   │       ├── demo_module.utils.ts
│   │       └── demo_module.validation.ts
│   ├── routers/
│   │   └── index.ts
│   ├── shared/
│   │   └── prisma.ts              (PostgreSQL only)
│   └── utils/
│       ├── catchAsync.ts
│       ├── commonUtils.ts
│       ├── logger.ts
│       ├── node_cache.ts
│       ├── removeUploadedFiles.ts
│       ├── sendEmail.ts
│       └── sendResponse.ts
├── logs/
│   └── YYYY-MM/
│       ├── YYYY-MM-DD-combined.log
│       ├── YYYY-MM-DD-error.log
│       ├── YYYY-MM-DD-exceptions.log
│       └── YYYY-MM-DD-rejections.log
├── uploads/
│   ├── images/
│   └── videos/
├── prisma/                        (PostgreSQL only)
│   └── schema.prisma
├── dist/
├── .env
├── .env.example
├── .gitignore
├── .prettierrc.json
├── eslint.config.mjs
├── tsconfig.json
└── package.json
```

---

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

---

## 🔥 Code Examples

### Query Builder — MongoDB

```typescript
import QueryBuilder from '../../builder/QueryBuilder';
import { DemoModel } from './demo_module.model';

const queryBuilder = new QueryBuilder(DemoModel.find(), req.query)
  .search(['name', 'description'])
  .filter()
  .sort()
  .paginate()
  .fields();

const data = await queryBuilder.modelQuery;
const meta = await queryBuilder.countTotal();
```

### Query Builder — PostgreSQL

```typescript
import QueryBuilder from '../../builder/QueryBuilder';
import { prisma } from '../../shared/prisma';

const queryBuilder = new QueryBuilder(prisma.demo, req.query)
  .search(['name', 'description'])
  .filter()
  .sort()
  .paginate()
  .fields();

const data = await queryBuilder.execute();
const meta = await queryBuilder.countTotal();
```

### Authentication

```typescript
import { auth } from '../../middlewares/auth';

// Role-based
router.get('/admin', auth('admin', 'superAdmin'), AdminController.getData);

// Any authenticated user
router.get('/profile', auth(), UserController.getProfile);
```

### Validation

```typescript
import { validateRequest } from '../../middlewares/validateRequest';
import { demoValidation } from './demo_module.validation';

router.post('/create', validateRequest(demoValidation.create), DemoController.create);
```

### Sending a Response

```typescript
import { sendResponse } from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';

const getAll = catchAsync(async (req, res) => {
  const result = await DemoService.getAll(req.query);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'Fetched successfully',
    data: result.data,
    meta: result.meta,
  });
});
```

### Throwing Errors

```typescript
import { AppError } from '../../errors/AppError';

throw new AppError(404, 'user', 'User not found');
```

### Logger

```typescript
import { logger } from '../../utils/logger';

logger.info('Server started');
logger.error('Something went wrong', error);
logger.warn('Deprecated usage detected');
logger.debug('Query result', result);
```

### Email

```typescript
import { sendEmail } from '../../utils/sendEmail';

await sendEmail('user@example.com', {
  subject: 'Welcome!',
  emailBody: '<h1>Welcome to our platform</h1>',
});
```

### Cache

```typescript
import { setCache, getCache, deleteCache } from '../../utils/node_cache';

setCache('user:123', userData, 3600);       // set with TTL
const user = getCache('user:123');           // get
deleteCache('user:123');                     // delete
```

---

## 🔧 Creating a New Module

### 1. Create the folder

```bash
mkdir -p src/modules/user
```

### 2. Create these files

- `user.route.ts`
- `user.controller.ts`
- `user.service.ts`
- `user.model.ts` (MongoDB) or update `prisma/schema.prisma` (PostgreSQL)
- `user.validation.ts`
- `user.interface.ts`

### 3. Register the route

In `src/routers/index.ts`:

```typescript
import { userRouter } from '../modules/user/user.route';

const moduleRoutes = [
  { path: '/demo', route: demoRouter },
  { path: '/users', route: userRouter },
];
```

---

## 📄 License

This project is licensed under a custom **End User License Agreement (EULA)**.

You may use this package to generate unlimited projects for personal or commercial use. You may **not** copy, modify, redistribute, or republish the CLI tool itself without explicit written permission from the author.

See the [LICENSE](LICENSE) file for full terms.

---

## 👨‍💻 Author

**Rohit Satyanarayana Miryala**

- Email: rohitmiryala@gmail.com
- LinkedIn: [linkedin.com/in/rohit-miryala](https://linkedin.com/in/rohit-miryala)
- GitHub: [github.com/rohitmiryala](https://github.com/rohitmiryala)

---

## ⭐ Support

If this project helped you, give it a ⭐ on npm!

```bash
npx miryala
```
