import URL from "../models/url-model.js";
import { Router } from "express";
const router = Router();

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

export default router;
