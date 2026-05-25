const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const { connectDB } = require("./connection");
const urlRoute = require("./routes/url");
const staticUrl = require("./routes/staticUrl");
const user = require("./routes/user");
const { restrictToLogin } = require("./middlewares/auth");

const app = express();
const PORT = 8001;

connectDB("mongodb://127.0.0.1:27017/url-shortner")
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => {
    console.log("Error: ", error);
  });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/url", restrictToLogin, urlRoute);
app.use("/static", staticUrl);
app.use("/user", user);

app.listen(PORT, () => console.log("Server started at: ", PORT));
