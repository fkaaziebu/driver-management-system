const { getLogger, configure } = require("log4js");
const config = require("config");
const { logFileName, logFolderName } = config;

configure({
  appenders: {
    app: { type: "file", filename: logFileName },
    out: { type: "stdout" },
    multi: {
      type: "multiFile",
      base: logFolderName,
      property: "categoryName",
      extension: ".log",
      maxLogSize: 1024 * 1024,
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

const logger = getLogger();
const loggerF = (err, req) => {
  const { status, message, errors } = err;

  logger.info(`${req.url}\t${req.method}`);

  if (errors) {
    logger.error(req.originalUrl);
    errors.forEach((error) => {
      logger.error(error);
    });
    logger.info(`${message}\t${status}`);
  }
};

module.exports = loggerF;
