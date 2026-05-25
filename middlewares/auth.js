const { getUser } = require("../services/session");

async function restrictToLogin(req, res, next) {
  const session = req.cookies.sessionId;
  if (!session) return res.redirect("/static/login");

  const user = getUser(session);
  if (!user) return res.redirect("/static/login");

  req.user = user;
  next();
}

module.exports = {
  restrictToLogin,
};
