const express = require("express");

const urlRoute = require("./routes/url");
const { connectDB } = require("./connection");

const app = express();
const PORT = 8000;

connectDB("mongodb://127.0.0.1:27017/url-shortner").then(() =>
  console.log("MongoDB connected successfully"),
).catch(error=>{console.log("Error: ", error)});

//app.use(express.urlencoded())
app.use(express.json())
app.use("/url", urlRoute);

app.listen(PORT, () => console.log("Server started at: ", PORT));
