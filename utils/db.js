const { Sequelize } = require("sequelize");
require("dotenv").config();

// DB sequelize 선언
const sequelize = new Sequelize('db.sqlite3', 'username', 'password', {
    dialect: 'sqlite',
    host: process.env.DB_PATH,

})

module.exports = sequelize;