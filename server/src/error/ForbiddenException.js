const en = require("../../locales/en/translation.json");
module.exports = function ForbiddenException(message) {
  this.status = 403;
  this.message = message || en.inactive_authentication_failure;
};
