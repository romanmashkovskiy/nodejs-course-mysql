const Sequelize = require('sequelize');

const DB_NAME = 'node-todo';
const DB_USERNAME = 'root';
const DB_PASSWORD = '1987';
const DB_HOST = 'localhost';

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
});

module.exports = sequelize;