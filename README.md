# Miryala

`miryala` is a powerful CLI tool that scaffolds a **production-ready TypeScript Express.js backend** with MongoDB or PostgreSQL support in seconds. It includes authentication, validation, error handling, rate limiting, file uploads, caching, and more.

## ✨ Features

### 🏗️ Complete Project Structure
- **Modular architecture** with `controllers`, `services`, `routes`, `middlewares`, `utils`
- **TypeScript** with strict mode, ESLint, and Prettier pre-configured
- **Centralized configuration** and error handling
- **Demo module** included as a reference

### 🗄️ Database Support
- **MongoDB** with Mongoose + fluent query builder
- **PostgreSQL** with Prisma + fluent query builder

### 🔐 Security & Authentication
- JWT authentication middleware with role-based access control
- Rate limiting with progressive blocking
- Input validation with Zod schemas
- CORS and cookie parser configured

### 🛠️ Built-in Utilities
- **File uploads** with Multer (type & size validation)
- **Email sending** with Nodemailer
- **In-memory caching** with node-cache
- **Query builders** for search, filter, sort, paginate
- **Common utilities**: OTP generation, JWT helpers, phone/email validation

### 📦 Ready-to-Use Middlewares
- `auth` - JWT authentication & authorization
- `validateRequest` - Zod schema validation
- `rateLimitingHandler` - Progressive rate limiting
- `handleFileUpload` - Multer file upload
- `globalErrorHandler` - Centralized error handling
- `notFound` - 404 handler

---

## 🚀 Quick Start

### Installation

No installation required! Use `npx`:

```bash
npx miryala
```

Or install globally:

```bash
npm install -g miryala
miryala
```

### Usage

1. Run the CLI:
```bash
npx miryala
```

2. Choose your database:
```
Which database would you like to use? (mongodb/postgresql):
```

3. Wait for setup to complete (installs all dependencies automatically)

4. Configure your `.env` file:

**For MongoDB:**
```env
MONGO_URI=mongodb://localhost:27017/mydb
PORT=4001
JWT_ACCESS_SECRET=your_secret
JWT_REFRESH_SECRET=your_refresh_secret
```

**For PostgreSQL:**
```env
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
PORT=4001
JWT_ACCESS_SECRET=your_secret
JWT_REFRESH_SECRET=your_refresh_secret
```

5. **(PostgreSQL only)** Create your database schema:
```bash
npx prisma migrate dev --name init
```

6. Start development server:
```bash
npm run dev
```

7. Open `http://localhost:4001` in your browser

---

## 📁 Generated Project Structure

```
my-project/
├── src/
│   ├── app.ts                    # Express app
│   ├── server.ts                 # Server entry
│   ├── builder/                  # Query builders
│   ├── config/                   # Environment config
│   ├── constants/                # App constants
│   ├── errors/                   # Error handling
│   ├── interfaces/               # TypeScript types
│   ├── middlewares/              # Auth, validation, etc.
│   ├── modules/                  # Feature modules
│   │   └── demo_module/          # Example module
│   ├── routers/                  # Route registry
│   ├── shared/                   # Shared resources
│   └── utils/                    # Utility functions
├── prisma/                       # (PostgreSQL only)
├── dist/                         # Compiled output
├── .env
├── tsconfig.json
├── eslint.config.mjs
└── package.json
```

---

## 📚 Documentation

- **[Setup Guide](./docs/setup-guide.md)** - Detailed step-by-step instructions
- **[Project Features](./docs/project-features.md)** - Complete feature breakdown

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

## 🔥 Key Features Explained

### Query Builder (MongoDB)

```typescript
import QueryBuilder from '../../builder/QueryBuilder';
import { DemoModel } from './demo_module.model';

const result = await new QueryBuilder(DemoModel.find(), req.query)
  .search(['name', 'description'])
  .filter()
  .sort()
  .paginate()
  .fields()
  .modelQuery;

const meta = await queryBuilder.countTotal();
```

### Query Builder (PostgreSQL)

```typescript
import PrismaQueryBuilder from '../../builder/QueryBuilder';
import { prisma } from '../../shared/prisma';

const result = await new PrismaQueryBuilder(prisma.demo, req.query)
  .search(['name', 'description'])
  .filter()
  .sort()
  .paginate()
  .fields()
  .execute();

const meta = await queryBuilder.countTotal();
```

### Authentication Middleware

```typescript
import { auth } from '../../middlewares/auth';

router.get('/admin', auth('admin', 'superAdmin'), AdminController.getData);
```

### Validation Middleware

```typescript
import { validateRequest } from '../../middlewares/validateRequest';
import { demoValidation } from './demo_module.validation';

router.post('/create', validateRequest(demoValidation.create), DemoController.create);
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Rohit Satyanarayana Miryala**

---

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!