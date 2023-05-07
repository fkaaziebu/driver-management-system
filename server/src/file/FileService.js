const fs = require("fs");
const path = require("path");
const config = require("config");
const { randomString } = require("../shared/generator");
const FileType = require("file-type")

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
  // Create a randome string for the profile image name
  const filename = randomString(32);
  // Get path to save image
  const filePath = path.join(".", uploadDir, profileDir, filename);
  // Save image to the path
  await fs.promises.writeFile(filePath, base64File, "base64");
  // return the filename to be saved in database
  return filename;
};

const deleteProfileImage = async (filename) => {
  // Get the image in the profile folder
  const filePath = path.join(".", uploadDir, profileDir, filename);
  // Delete the image by unlinking
  await fs.promises.unlink(filePath);
};

const isLessThan2MB = (buffer) => {
  return buffer.length < 2 * 1024 * 1024;
};

const isSupportedFileType = async (buffer) => {
  // Check file type using file-type library
  const type = await FileType.fromBuffer(buffer);
  // Return false for undefined files
  // Also return false for files that are not PNG or JPEG
  return !type
    ? false
    : type.mime === "image/png" || type.mime === "image/jpeg";
};

module.exports = { createFolders, saveProfileImage, deleteProfileImage, isLessThan2MB, isSupportedFileType };
