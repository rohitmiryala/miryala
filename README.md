# Miryala

`miryala` is a CLI tool that helps you scaffold a Node.js project with predefined folders and integrates Express and WebSocket. It saves time by automatically setting up `controllers`, `middlewares`, `models`, `utils`, and a ready-to-use `server.js` file.

## Features
- Predefined folder structure:
  - `controllers/`
  - `middlewares/`
  - `models/`
  - `utils/`
  - `routes/`
- A ready-to-use `server.js` with:
  - Express setup
  - WebSocket integration
- Included `app.js` for API routes.
- Automatically installs `express`, `ws`, and `nodemon`.

## Usage

Run the following command to scaffold a new project:
```bash
npx miryala
```
- This command will:
 - Create the predefined folder structure.
 - Generate server.js and app.js with basic setup.
 - Install express, ws, and nodemon automatically.

## For Database Setup

- If you select MongoDB, ensure that the `MONGO_URI` is specified in the `.env` file.
- If you select MySQL, ensure that the `MYSQL_DB`, `MYSQL_USER`, `MYSQL_PASSWORD`, and `MYSQL_HOST` are provided in the `.env` file.

## Starting the Project

- After the project is initialized with database setup, you can start the development server with:
```bash
npm run dev
```
- This will start the server with nodemon, enabling hot-reloading during development.

## License

- This project is licensed under the MIT License - see the LICENSE file for details.