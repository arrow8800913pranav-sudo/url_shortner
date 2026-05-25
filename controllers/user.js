const { v4: uuidv4 } = require("uuid");

const User = require("../models/user");
const { setIdToUser, getUser } = require("../services/session");

async function createUser(req, res) {
  try {
    const body = req.body;
    const user = await User.create({
      name: body.name,
      email: body.email,
      password: body.password,
    });
    return res.render("home");
  } catch (err) {
    if (err.code === 11000) {
      return res.render("signup", {
        error: "Email already exists",
      });
    }
    return res.render("signup", {
      error: "Something went wrong",
    });
  }
}

async function handleLoginUser(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.render("login", {
      error: "Invaid email or password",
    });
  }
  const sessionId = uuidv4();
  setIdToUser(sessionId, user);
  res.cookie("sessionId", sessionId);
  return res.render("home");
}

async function handleUserLogout(req, res) {
  const session = req.cookies.sessionId;
  res.clearCookie("sessionId")
  return res.redirect("/static/login");
}

module.exports = {
  createUser,
  handleLoginUser,
  handleUserLogout,
};
