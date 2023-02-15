const jwt = require("jsonwebtoken");
require("dotenv").config();

// JWT access token 발행
const createTokens = (user) => {
  const accessToken = jwt.sign(
    { email: user.email },
    process.env.ACCESS_TOKEN,
    {
      expiresIn: "7d",
    }
  );

  return accessToken;
};

// 쿠키에 저장돼 있는 access token 진위 여부 확인
const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];

  if (!accessToken) {
    req.authenticated = false;
  } else {
    const validToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN);
    if (validToken) {
      req.authenticated = true;
    } else {
      req.authenticated = false;
    }
  }

  return next();
};

module.exports = { createTokens, validateToken };
