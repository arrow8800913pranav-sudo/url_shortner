import { getUser } from "../services/session.js";

export async function restrictToLogin(req, res, next) {
  const session = req.cookies.sessionId;
  if (!session)
    return res.status(401).json({
      statusCode: 401,
      msg: "Invalid or expired token",
    });

  const user = getUser(session);
  if (!user)
    return res.status(500).json({
      statusCode: 500,
      msg: "Internal server error",
    });

  req.user = user;
  next();
}
