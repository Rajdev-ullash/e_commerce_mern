const express = require("express");

const morgan = require("morgan");

const cors = require("cors");

const bodyParser = require("body-parser");

const dotEnv = require("dotenv");

const colors = require("colors");

const connectDb = require("./config/db");

// var device = require("express-device");

var useragent = require("express-useragent");
const DeviceDetector = require("node-device-detector");

// configuration dot env

dotEnv.config({
  path: "backend/config/config.env",
});

// database connection

connectDb();

// user device detection

const deviceDetector = new DeviceDetector();

//bot detection

const hasBotResult = (result) => {
  return result && result.name;
};

// device detection middleware

const middlewareDetect = (req, res, next) => {
  const useragent = req.useragent.source;
  req.useragent = useragent;
  req.device = deviceDetector.detect(useragent);
  req.bot = deviceDetector.parseBot(useragent);
  next();
};

// app define

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

app.use(useragent.express());
app.use(middlewareDetect);

//get user device information

app.get("/detect", (req, res) => {
  let useragent = req.useragent;
  let detectResult = req.device;
  let botResult = req.bot;
  res.send(
    JSON.stringify({
      useragent,
      detectResult,
      botResult,
      isBot: hasBotResult(botResult),
    })
  );
});

//default error handler

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
};

app.use(errorHandler);

const userRoutes = require("./router/authRouter");
const categoryRoutes = require("./router/categoryRouter");
const subCategoryRoutes = require("./router/subCategoryRouter");
// const chatRoutes = require('./routers/chatRoutes')

app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/subCategory", subCategoryRoutes);

app.get("/", (req, res) => {
  res.send("api is running");
});

const PORT = process.env.PORT || 5000;

app.listen(
  `${PORT}`,
  console.log(`server is started at port ${PORT}`.yellow.bold)
);
