const express = require("express");
const crawl = require("../utils/crawl");

const router = express.Router();

router.get("/", async (req, res, next) => {
  let json = await crawl(true);
  console.log("from ranking route /");
  res.json(json);
});

module.exports = router;
