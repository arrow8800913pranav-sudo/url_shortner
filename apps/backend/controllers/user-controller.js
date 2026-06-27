import { v4 as uuidv4 } from "uuid";

import User from "../models/user-model.js";
import { setIdToUser, getUser } from "../services/session.js";

export async function createUser(req, res) {
  try {
    const body = req.body;
    const user = await User.create({
      name: body.name,
      email: body.email,
      password: body.password,
    });
    return res.status(201).json({
      statusCode: 201,
      msg: "User created successfully",
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        statusCode: 409,
        msg: "Email already exists",
      });
    }
    return res.status(500).json({
      statusCode: 500,
      msg: "Something went wrong",
    });
  }
}

export async function handleLoginUser(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    console.log("user not found")
    return res.status(404).json({
      statusCode: 404,
      msg: "User does not exist",
    });
  }
  const isPasswordCorrect = password === user.password;
  if (!isPasswordCorrect) {
    console.log("password is invalid")
    return res.status(401).json({
      statusCode: 401,
      msg: "Incorrect credentials",
    });
  }
  const sessionId = uuidv4();
  setIdToUser(sessionId, user);
  res.cookie("sessionId", sessionId);
  return res.status(200).json({
    statusCode: 200,
    msg: "User logged in sucessfully",
  });
}

export async function handleUserLogout(req, res) {
  const session = req.cookies.sessionId;
  res.clearCookie("sessionId");
  return res.status(200).json({
    statusCode: 200,
    msg: "Logged out successully",
  });
}
