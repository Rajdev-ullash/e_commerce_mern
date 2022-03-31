// var Useragent = require("express-useragent");
// const DeviceDetector = require("node-device-detector");

// // app.use(useragent.express());
// const deviceDetector = new DeviceDetector();
// const useragent = new Useragent.express();

// // create middleware
// const hasBotResult = (result) => {
//   return result && result.name;
// };

// exports.middlewareDetect = (req, res, next) => {
//   const useragent = req.useragent.source;
//   req.useragent = useragent;
//   req.device = deviceDetector.detect(useragent);
//   req.bot = deviceDetector.parseBot(useragent);
//   next();
// };

// attach middleware
// app.use(middlewareDetect);

// create test route
// app.get("/detect", (req, res) => {
//   let useragent = req.useragent;
//   let detectResult = req.device;
//   let botResult = req.bot;
//   res.send(
//     JSON.stringify({
//       useragent,
//       detectResult,
//       botResult,
//       isBot: hasBotResult(botResult),
//     })
//   );
// });
