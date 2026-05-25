const express = require("express");

const {
  createUser,
  handleLoginUser,
  handleUserLogout,
} = require("../controllers/user");

const router = express.Router();

router.post("/signup", createUser);
router.post("/login", handleLoginUser);
router.post("/logout", handleUserLogout);

module.exports = router;
