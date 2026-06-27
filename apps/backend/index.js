import express, { json, urlencoded } from "express";
import { resolve } from "path";
import cookieParser from "cookie-parser";

import { connectDB } from "./connection.js";
import urlRoute from "./routes/url-routes.js";
import staticUrl from "./routes/staticUrl.js";
import user from "./routes/user-routes.js";
import { restrictToLogin } from "./middlewares/auth-middleware.js";

const app = express();
const PORT = 8001;

connectDB("mongodb://127.0.0.1:27017/url-shortner")
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => {
    console.log("Error: ", error);
  });

//app.set("view engine", "ejs");
//app.set("views", resolve("./views"));

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/url", restrictToLogin, urlRoute);
app.use("/static", staticUrl);
app.use("/user", user);

app.listen(PORT, () => console.log("Server started at: ", PORT));
