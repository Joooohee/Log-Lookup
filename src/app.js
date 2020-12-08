import express from "express";
import morgan from "morgan";
import path from "path";

// import { webPoolPromise } from "./db.js";

const home = async (req, res) => {
  try {
    // const pool = await webPoolPromise;
    // const { recordset } = await pool
    //   .request()
    //   .query(`SELECT USER_ID, USER_NAME FROM [USER] WHERE USER_ID='${id}' AND USER_PASSWORD='${password}'`);
    res.render("index", { title: "Hey", message: "Hello there!" });
  } catch (error) {
    res.render("index", { title: "Hey", message: "Hello there!" });
  }
};

const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "static")));
// app.use(express.static(path.join(__dirname, "js")));
app.use(morgan("dev"));
app.use("/", home);

export default app;
