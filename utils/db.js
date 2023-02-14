const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize('db.sqlite3', 'username', 'password', {
    dialect: 'sqlite',
    host: process.env.DB_PATH,

})

module.exports = sequelize;