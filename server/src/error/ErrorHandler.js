const loggerF = require("../middleware/loggerF");
module.exports = (err, req, res, next) => {
  loggerF.info(`${req.url}\t${req.method}`);
  loggerF.error(message);
  const { status, message, errors } = err;
  let validationErrors;
  if (errors) {
    validationErrors = {};
    errors.forEach((error) => {
      validationErrors[error.path] = error.msg;
    });
  }
  res.status(status).send({
    path: req.originalUrl,
    timestamp: new Date().getTime(),
    message,
    validationErrors,
  });
};
