const express = require("express");
// const bodyParser = require('body-parser');

const rankingRoute = require("./routes/ranking_route");

const app = express();

app.use("/api/ranking", rankingRoute);

app.listen(5000, () => {
  console.log("server is learning on port 5000");
});