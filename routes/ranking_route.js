const express = require("express");
const crawl = require("../utils/crawl");
const { validateToken } = require("../utils/jwt");

const router = express.Router();

router.get("/", validateToken, async (req, res, next) => {
  await crawl(req.authenticated)
    .then((json) => {
      res.json(json);
    })
    .catch((err) => {
      if (err) {
        res.status(400).json({ error: err });
      }
    });
});

module.exports = router;
