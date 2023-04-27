const en = require("../../locales/en/translation.json");
module.exports = function InvalidTokenException() {
  this.message = en.account_activation_failure;
  this.status = 400;
};
