const express = require("express");

const { createUser, handleLoginUser } = require("../controllers/user");

const router = express.Router();

router.post("/signup", createUser);
router.post("/login", handleLoginUser)

module.exports = router;
