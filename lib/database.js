const { createFile } = require('./filesystem');
const { getLatestVersion } = require('./dependencies');

const setupDatabase = async (dbChoice) => {
    console.log(`Setting up ${dbChoice.toUpperCase()}...`);
    if (dbChoice === 'mongodb') {
        const mongooseVersion = await getLatestVersion('mongoose');
        createFile('db/mongodb.js', `
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(\`MongoDB Connected: \${conn.connection.host}\`);
    } catch (error) {
        console.error(\`Error: \${error.message}\`);
        process.exit(1);
    }
};

module.exports = { connectDB };
`);
        return { mongoose: `^${mongooseVersion}` };
    }

    if (dbChoice === 'mysql') {
        const sequelizeVersion = await getLatestVersion('sequelize');
        const mysql2Version = await getLatestVersion('mysql2');
        createFile('db/mysql.js', `
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.MYSQL_DB || 'testdb', process.env.MYSQL_USER || 'root', process.env.MYSQL_PASSWORD || '', {
    host: process.env.MYSQL_HOST || 'localhost',
    dialect: 'mysql',
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('MySQL Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = { sequelize, connectDB };
`);
        return {
            sequelize: `^${sequelizeVersion}`,
            mysql2: `^${mysql2Version}`,
        };
    }

    throw new Error('Unsupported database choice');
};

module.exports = { setupDatabase };