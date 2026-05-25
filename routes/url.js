const express = require("express");

const {
  handleCreateShortId,
  handleRedirectURLById,
  handleGetAnalytics,
  handleGetAllUrl,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleCreateShortId);
router.get("/all", handleGetAllUrl);
router.get("/:shortId", handleRedirectURLById);
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
