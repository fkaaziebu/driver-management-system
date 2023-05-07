const fs = require("fs");
const path = require("path");
const config = require("config");
const { randomString } = require("../shared/generator");

const { uploadDir, profileDir } = config;

const createFolders = () => {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  const profileFolder = path.join(".", uploadDir, profileDir);
  if (!fs.existsSync(profileFolder)) {
    fs.mkdirSync(profileFolder);
  }
};

const saveProfileImage = async (base64File) => {
  const filename = randomString(32);
  const filePath = path.join(".", uploadDir, profileDir, filename);
  await fs.promises.writeFile(filePath, base64File, "base64");
  return filename;
};

module.exports = { createFolders, saveProfileImage };
