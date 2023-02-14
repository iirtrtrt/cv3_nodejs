const jwt = require("jsonwebtoken");
require("dotenv").config();

const createTokens = (user) => {
  const accessToken = jwt.sign(
    { email: user.email, id: user.id },
    process.env.ACCESS_TOKEN
  );

  return accessToken;
};

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
