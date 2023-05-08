const { getLogger, configure } = require("log4js");

configure({
  appenders: {
    app: { type: "file", filename: "app.log" },
    out: { type: "stdout" },
    multi: {
      type: "multiFile",
      base: "logs/",
      property: "categoryName",
      extension: ".log",
      maxLogSize: 1024,
      backup: 3,
      compress: true,
    },
  },
  categories: {
    default: {
      appenders: ["app", "out", "multi"],
      level: "debug",
    },
  },
});

const loggerF = getLogger();
// const loggerF = (req, res, next) => {

//   logger.info(`${req.url}\t${req.method}`);
//   logger.debug("Logging debug");
//   logger.warn("Logging for warning");
//   logger.error("logging error");
// };

module.exports = loggerF;
