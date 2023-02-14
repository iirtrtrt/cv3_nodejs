const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sequelize = require("./utils/db");
require("dotenv").config();

sequelize.sync().then(() => console.log("Sqlite3 is working"));

// const createDB = require("./utils/create_db");
// // DB파일이 없다면 DB 생성
// fs.access(process.env.DB_PATH, fs.F_OK, (err) => {
//   if (err) {
//     console.error(err);
//     createDB();
//   }
// });

const rankingRoute = require("./routes/ranking_route");
const authRoute = require("./routes/authentication_route");

const app = express();

// express uses
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/ranking", rankingRoute);
app.use("/api/auth", authRoute);

// app.use(
//   express.urlencoded(),
//   cors({
//     origin: "http://localhost:3000",
//   })
// );

app.listen(5000, () => {
  console.log("server is learning on port 5000");
});
