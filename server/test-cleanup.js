const fs = require("fs");
const path = require("path");
const config = require("config");

const { uploadDir, profileDir, logFileName, logFolderName } = config;
// Get profile directory path
const profileDirectory = path.join(".", uploadDir, profileDir);
// Get logs directory path
const logDirectory = path.join(".", logFolderName);

// Delete all images used in test after closing test
const files = fs.readdirSync(profileDirectory);
// Loop through the image folder and delete each file
for (const file of files) {
  fs.unlinkSync(path.join(profileDirectory, file));
}
// Delete all saved logs from the logDirectory for test
const logs = fs.readdirSync(logDirectory);
// Loop through the logs folder and delete each file
for (const log of logs) {
  fs.unlinkSync(path.join(logDirectory, log));
}
// Empty log file after test is closed
fs.writeFileSync(path.join(".", logFileName), "",);
