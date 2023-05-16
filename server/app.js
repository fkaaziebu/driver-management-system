const express = require("express");

const app = express();

app.use(cors());

app.post("/api/1.0/drivers", (req, res) => {
  return res.status(200).send();
});

module.exports = app;
