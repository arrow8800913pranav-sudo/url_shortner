const User = require("../models/user");

async function createUser(req, res) {
  const body = req.body;
  const user = await User.create({
    name: body.name,
    email: body.email,
    password: body.password,
  });
  return res.render("home");
}

async function handleLoginUser(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user)
    res.render("login", {
      error: "Invaid email or password",
    });
  return res.render("home");
}

module.exports = {
  createUser,
  handleLoginUser,
};
