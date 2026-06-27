import shortid from "shortid";
import url from "../models/url-model.js";

//The  request body needs links with https:// otherwsie next get fails
export async function handleCreateShortId(req, res) {
  const body = req.body;

  if (!body || !body.url) {
    return res.status(400).json({
      statusCode: 400,
      msg: "URL is required",
    });
  }

  const shortId = shortid();

  await url.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });

  return res.status(201).json({
    statusCode: 201,
    msg: "URL generated successfully",
    body: {
      shortId: shortId,
    },
  });
}

export async function handleRedirectURLById(req, res) {
  const shortId = req.params.shortId;

  console.log("PARAM:", shortId, req.params.id);

  const entry = await url.findOneAndUpdate(
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
    return res.status(404).json({ statusCode: 404, msg: "URL not found" });
  }
  //redirects to original link after hit on browser
  return res.redirect(entry.redirectURL);
}

export async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const analytics = await url.findOne({ shortId });
  if (!analytics) {
    return res.status(500).json({
      statusCode: 500,
      msg: "Internal server error",
    });
  }
  return res.status(200).json({
    statusCode: 200,
    msg: "Fetched successfully",
    body: {
      totalClicks: analytics.visitHistory.length,
      analytics: analytics.visitHistory,
    },
  });
}
