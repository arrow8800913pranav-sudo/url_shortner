const shortid = require("shortid");
const URL = require("../models/url");

//The  request body needs links with https:// otherwsie next get fails
async function handleCreateShortId(req, res) {
  const body = req.body;

  if (!body || !body.url) {
    return res.status(400).json({ msg: "URL is required" });
  }

  const shortId = shortid();

  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.render("home", {
    id: shortId,
  });
  // return res.status(201).json({
  //   msg: "URL generated successfully",
  //   shortId,
  // });
}

async function handleRedirectURLById(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId: shortId },
    {
      $push: {
        visitHistory: {
          timestamps: Date.now(),
        },
      },
    },
  );
  if (!entry) {
    return res.status(404).json({ msg: "URL not found" });
  }

  return res.redirect(entry.redirectURL);
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const analytics = await URL.findOne({ shortId });
  return res.status(200).json({
    msg: "Fetched successfully",
    totalClicks: analytics.visitHistory.length,
    analytics: analytics.visitHistory,
  });
}

async function handleGetAllUrl(req, res) {
  const url = await URL.find({});
  return res.render("home", {
    urls: url,
  });
}

module.exports = {
  handleCreateShortId,
  handleRedirectURLById,
  handleGetAnalytics,
  handleGetAllUrl,
};
