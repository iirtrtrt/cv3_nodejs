const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sequelize = require("./utils/db");
require("dotenv").config();

sequelize.sync().then(() => console.log("Sqlite3 is working"));

const rankingRoute = require("./routes/ranking_route");
const authRoute = require("./routes/authentication_route");

const app = express();

const whitelist = ["http://localhost:3000"];
const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      return callback(null, true);
    }

    callback(new Error("Not allowed by CORS"));
  },
};
app.use(cors(corsOptions));

// express uses
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/ranking", rankingRoute);
app.use("/api/auth", authRoute);

app.listen(5000, () => {
  console.log("server is learning on port 5000");
});
