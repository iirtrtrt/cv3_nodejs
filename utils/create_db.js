const sqlite3 = require("sqlite3").verbose();
require("dotenv").config();

const sqlCreateTable = `CREATE TABLE Users(id INTEGER PRIMARY KEY, email, password)`;

const createDB = () => {
  const db = new sqlite3.Database(process.env.DB_PATH, (err) => {
    if (err) {
      console.log(err.message);
      process.exit(1);
    }
  });

  db.run(sqlCreateTable);
  console.log("sqlite3 DB is created");
};

module.exports = createDB;