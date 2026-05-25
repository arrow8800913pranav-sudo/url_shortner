const URL = require("../models/url");
const express = require("express");
const router = express.Router();

router.get("/all", async (req, res) => {
  const url = await URL.find({});
  console.log(url[0].shortId);
  return res.render("home", {
    urls: url,
  });
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;
