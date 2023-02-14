const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Users = require("../models/users");
const { createTokens, validateToken } = require("../utils/jwt");
require("dotenv").config();

const router = express.Router();

router.post("/register", async (req, res, next) => {
  const user = await Users.findOne({ where: { email: req.body.email } });

  if (!user) {
    const { email, password } = req.body;
    bcrypt.hash(password, 10).then(async (hash) => {
      await Users.create({
        email: email,
        password: hash,
      })
        .then(() => {
          res.json("The account is created");
        })
        .catch((err) => {
          if (err) {
            res.json({ error: err });
          }
        });
    });
  } else {
    res.json("The email is not unique");
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ where: { email: req.body.email } });

  if (!user) {
    res.json({ error: "No account" });
  } else {
    const dbPassword = user.password;
    bcrypt.compare(password, dbPassword).then((match) => {
      if (!match) {
        res.json({ error: "Password error" });
      } else {
        const accessToken = createTokens(user);

        res.cookie("access-token", accessToken, {
          maxAge: 60 * 60 * 24 * 30 * 1000,
          httpOnly: true,
        });

        res.json({ accessToken: accessToken });
      }
    });
  }
});

router.post("/logout", validateToken, async (req, res, next) => {
  if (req.authenticated) {
    res.clearCookie("access-token").json("Logout success");
  } else {
    res.json({ error: "Something error" });
  }
});

router.get("/test", validateToken, async (req, res) => {
  // console.log(req.authenticated);
  if (req.authenticated) {
    res.json("cookie token works");
  } else {
    res.json({ error: "Something error" });
  }
});

module.exports = router;
