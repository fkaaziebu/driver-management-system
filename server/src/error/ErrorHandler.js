const loggerF = require("../logs/loggerF");
module.exports = (err, req, res, next) => {
  const { status, message, errors } = err;
  let validationErrors;
  if (errors) {
    validationErrors = {};
    errors.forEach((error) => {
      validationErrors[error.path] = error.msg;
    });
  }
  loggerF(err, req);
  res.status(status).send({
    path: req.originalUrl,
    timestamp: new Date().getTime(),
    message,
    validationErrors,
  });
};
