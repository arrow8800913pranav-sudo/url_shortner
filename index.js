const express = require("express");
const path = require("path");

const urlRoute = require("./routes/url");
const staticUrl = require("./routes/staticUrl")
const { connectDB } = require("./connection");

const app = express();
const PORT = 8000;

connectDB("mongodb://127.0.0.1:27017/url-shortner")
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => {
    console.log("Error: ", error);
  });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use("/url", urlRoute);
app.use("/static", staticUrl);

app.listen(PORT, () => console.log("Server started at: ", PORT));
