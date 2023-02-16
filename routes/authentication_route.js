const express = require("express");
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
          res.status(201).json({ email: email, password: password });
        })
        .catch((err) => {
          if (err) {
            res.status(404).json({ error: err });
          }
        });
    });
  } else {
    res.status(405).json("The email is not unique");
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ where: { email: req.body.email } });

  if (!user) {
    res.status(404).json({ error: "No account" });
  } else {
    const dbPassword = user.password;
    bcrypt.compare(password, dbPassword).then((match) => {
      if (!match) {
        res.status(404).json({ error: "Password error" });
      } else {
        const accessToken = createTokens(user);

        res.cookie("access-token", accessToken, {
          maxAge: 7 * 60 * 60 * 24 * 1000,
          httpOnly: true,
        });

        res.status(201).json({ accessToken: accessToken });
      }
    });
  }
});

router.get("/validate_token", validateToken, async (req, res, next) => {
  if (req.authenticated) {
    res.status(201).json("Good token");
  } else {
    res.status(404).json({ error: "Something error" });
  }
});

module.exports = router;
