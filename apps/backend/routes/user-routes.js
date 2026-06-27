import { Router } from "express";

import { createUser, handleLoginUser, handleUserLogout } from "../controllers/user-controller.js";

const router = Router();

router.post("/signup", createUser);
router.post("/login", handleLoginUser);
router.post("/logout", handleUserLogout);

export default router;
