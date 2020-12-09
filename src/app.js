import express from "express";
import morgan from "morgan";
import path from "path";
import { webPoolPromise } from "./db.js";

const home = async (req, res) => {
  try {
    res.render("index", { title: "Hey", message: "Hello there!" });
  } catch (error) {
    res.render("index", { title: "Hey", message: "Hello there!" });
  }
};

const getDateFormat = (date) => {
  const year = date.substring(0, 4);
  const month = date.substring(4, 6);
  const day = date.substring(6);
  console.log(year, month, day);
  return `${year}-${month}-${day}`;
};

const getLog = async (req, res) => {
  const { todate, fromdate, name } = req.query;
  // const startDate = getDateFormat(todate);
  // const endDate = getDateFormat(fromdate);
  try {
    const pool = await webPoolPromise;
    const { recordset } = await pool
      .request()
      .query(
        `SELECT DocEntry, IF_Name, createDate, Error_CD, Error_Result, Error_Param FROM [LogManager] WHERE IF_NAME = '${name}' AND createDate BETWEEN '${todate}' AND '${fromdate}'`
      );
    res.json(recordset);
  } catch (error) {
    res.status(500);
    console.log(error);
  } finally {
    res.end();
  }
};

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "static")));
app.use(morgan("dev"));

app.get("/", home);
app.get("/log", getLog);

export default app;
