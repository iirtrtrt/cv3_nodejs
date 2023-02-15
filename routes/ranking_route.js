const express = require("express");
const getRanking = require("../utils/get_ranking");
const { validateToken } = require("../utils/jwt");

const router = express.Router();

router.get("/", validateToken, async (req, res, next) => {
  // 데이터 가져오기, req.authenticated = 로그인 여부
  await getRanking(req.authenticated)
    .then((json) => {
      // 성공시 리턴 JSON와 코드 201
      res.status(201).json(json);
    })
    .catch((err) => {
      if (err) {
        // 에러 발생시 리턴 코드 404
        res.status(404).json({ error: err });
      }
    });
});

module.exports = router;
