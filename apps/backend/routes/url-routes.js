import { Router } from "express";

import { handleCreateShortId, handleRedirectURLById, handleGetAnalytics } from "../controllers/url-controller.js";

const router = Router();

router.post("/", handleCreateShortId);
//router.get("/all", handleGetAllUrl);
router.get("/:shortId", handleRedirectURLById);
router.get("/analytics/:shortId", handleGetAnalytics);

export default router;
